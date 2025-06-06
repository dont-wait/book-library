package com.nhom678.server.service;

import com.nhom678.server.dto.request.authen.AuthenticationRequest;
import com.nhom678.server.dto.request.authen.IntrospectRequest;
import com.nhom678.server.dto.request.authen.LogoutRequest;
import com.nhom678.server.dto.request.authen.RefreshRequest;
import com.nhom678.server.dto.response.AuthenticationResponse;
import com.nhom678.server.dto.response.IntrospectResponse;
import com.nhom678.server.entity.InvalidatedToken;
import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.exception.AppException;
import com.nhom678.server.repositories.InvalidatedTokenRepository;
import com.nhom678.server.repositories.UserAccountRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;

import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;


@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthenticationService {
    UserAccountRepository userAccountRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;

    @NonFinal //bao cho spring ko inject vao contructor
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected Long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected Long REFRESH_DURATION;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        UserAccount userAccount = userAccountRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        Boolean authenticated = passwordEncoder.matches(request.getPassword(), userAccount.getPassword());
        if(!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        var token = generateToken(userAccount);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();

    }


    public IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException {
        var token = request.getToken();
        Boolean isValid = true;

        //If error, throw exception and catch it
        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try{
            // dùng true vì logout cần kiểm tra refresh token (dựa trên issueTime + REFRESH_DURATION)
            var signedToken = verifyToken(request.getToken(), true);

            String jwtId = signedToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signedToken.getJWTClaimsSet().getExpirationTime();

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jwtId)
                    .expiryTime(expiryTime)
                    .build();
            invalidatedTokenRepository.save(invalidatedToken);
        }catch (AppException e) {
            log.error("Error when verifying token: {}", e.getMessage());
        }


    }

    public AuthenticationResponse refreshToken(RefreshRequest request)
            throws ParseException, JOSEException {

        //Kiem tra hieu luc token
        var signedJwt = verifyToken(request.getToken(), true);

        //Invalid token cu
        var jwtId = signedJwt.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJwt.getJWTClaimsSet().getExpirationTime();
        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jwtId)
                .expiryTime(expiryTime)
                .build();

        //Logout token cu
        invalidatedTokenRepository.save(invalidatedToken);


        var userId = signedJwt.getJWTClaimsSet().getSubject();
        UserAccount userAccount = userAccountRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));
        var token = generateToken(userAccount);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    private SignedJWT verifyToken(String token, Boolean isRefresh) throws JOSEException, ParseException {


        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(REFRESH_DURATION, ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if(!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if(invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    private String generateToken(UserAccount userAccount) {

        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(userAccount.getUserId())
                .issuer("dontwait")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(userAccount))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(jwsHeader, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Error when generating token: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private String buildScope(UserAccount userAccount) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if(!CollectionUtils.isEmpty(userAccount.getRoles()))
            userAccount.getRoles().forEach(stringJoiner::add);

        return stringJoiner.toString();
    }
}
