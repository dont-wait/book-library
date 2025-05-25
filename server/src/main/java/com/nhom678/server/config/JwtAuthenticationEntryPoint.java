package com.nhom678.server.config;

//Token khi thuc hien login, Neu token kh co permission thi khong xem duoc myInfo, Hoac Token het han, invalid
//GlobalExceptionHandler khong bat duoc do viec kiem tra token nam o tang filter-do spring security quan li
//Ham nay dung de giup ta xu li dc exception o tren
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.enums.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;

        response.setStatus(errorCode.getStatus());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build(); //json
        ObjectMapper objectMapper = new ObjectMapper();

        response.getWriter().write(objectMapper.writeValueAsString(apiResponse)); //convert json to string
        response.flushBuffer();
    }
}
