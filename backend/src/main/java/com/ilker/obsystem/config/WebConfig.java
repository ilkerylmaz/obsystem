package com.ilker.obsystem.config;
import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**") // Tüm API yollarına izin ver
                        .allowedOrigins("http://localhost:3000") // Next.js adresin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // İzin verilen metodlar
                        .allowedHeaders("*") // Tüm headerlara izin ver (Authorization vb.)
                        .allowCredentials(true); // Cookie veya Auth header varsa izin ver
            }
        };
    }
}