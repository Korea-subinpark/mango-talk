package com.messenger.mango.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods(
                        "GET",
                        "OPTIONS",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH"
                )
                .maxAge(3600); // 3600초 동안 preflight 결과를 캐싱;
    }
}
