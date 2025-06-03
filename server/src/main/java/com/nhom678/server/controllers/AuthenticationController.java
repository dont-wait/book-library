package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.authen.AuthenticationRequest;
import com.nhom678.server.dto.request.authen.IntrospectRequest;
import com.nhom678.server.dto.request.authen.LogoutRequest;
import com.nhom678.server.dto.request.authen.RefreshRequest;
import com.nhom678.server.dto.response.AuthenticationResponse;
import com.nhom678.server.dto.response.IntrospectResponse;
import com.nhom678.server.services.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/log-in")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        var result = authenticationService.authenticate(request);
        
        // Create secure HTTP-only cookie
        Cookie cookie = new Cookie("auth_token", result.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Set to false for local development
        cookie.setPath("/");
        cookie.setMaxAge(3600); // 1 hour
        response.addCookie(cookie);
        
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody RefreshRequest request, HttpServletResponse response) throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        
        // Update cookie with new token
        Cookie cookie = new Cookie("auth_token", result.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Set to false for local development
        cookie.setPath("/");
        cookie.setMaxAge(3600);
        response.addCookie(cookie);
        
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

//    @PostMapping("/refresh")
//    ApiResponse<AuthenticationResponse> authenticate(@RequestBody RefreshRequest request) throws ParseException, JOSEException {
//        var result = authenticationService.refreshToken(request);
//        return ApiResponse.<AuthenticationResponse>builder()
//                .result(result)
//                .build();
//    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/log-out")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request, HttpServletResponse response) throws ParseException, JOSEException {
        authenticationService.logout(request);
        
        // Clear the auth cookie
        Cookie cookie = new Cookie("auth_token", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Set to false for local development
        cookie.setPath("/");
        cookie.setMaxAge(0); // Delete cookie
        response.addCookie(cookie);
        
        return ApiResponse.<Void>builder()
                .message("Logout successfully")
                .build();
    }
}
