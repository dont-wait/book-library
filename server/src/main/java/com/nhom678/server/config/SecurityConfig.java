package com.nhom678.server.config;

import com.nhom678.server.enums.UserRole;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    //Chua nhung public endpoint ai cx truy cap duoc
    private final String[] PUBLIC_URLS = {
            "/authen/**",
            "/api-ui.html",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-resources/**",
            "/webjars/**",
    };
    @Value("${JWT_SECRET}")
    private String signerKey;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable) //ngan ngua cross-site -> VIP but in this case, i still use that, so chill
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwtConfigurer ->
                                jwtConfigurer
                                        .decoder(jwtDecoder())
                                            .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint()) //Dieu huong Filter Spring xu li
                )
                .authorizeHttpRequests(request -> request
                        .requestMatchers(PUBLIC_URLS).permitAll() //authen
                        .requestMatchers(HttpMethod.POST, "/members/**").hasAnyRole(UserRole.ADMIN.name(), UserRole.LIBRARIAN.name())
                .anyRequest().authenticated());

        return httpSecurity.build();
    }

    //Convert scope prefix SCOPE_ to ROLE_
    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }

    //Hashed jwt secret key
    @Bean
    JwtDecoder jwtDecoder() { //oauth2 resource include nimbus jwt decoder
        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");

        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}