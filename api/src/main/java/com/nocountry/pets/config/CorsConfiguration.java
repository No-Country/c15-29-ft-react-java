package com.nocountry.pets.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

/*    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedOrigins("https://pawdevelopment.vercel.app")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }*/
    //CORS TOTALLY OPEN
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permitir cualquier ruta
                .allowedOrigins("*")  // Permitir cualquier origen
                .allowedMethods("*")  // Permitir cualquier método HTTP
                .allowCredentials(false);  // No permitir credenciales
    }
}
