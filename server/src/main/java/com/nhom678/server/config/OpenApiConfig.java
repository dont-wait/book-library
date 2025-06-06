package com.nhom678.server.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//API DOCUMENT
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("HUIT LIBRARY Documentation")
                        .version("1.0")
                        .description("API Documentation for Huit-libary-management application"));
    }
}
