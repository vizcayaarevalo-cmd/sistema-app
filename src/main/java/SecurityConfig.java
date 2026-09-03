package com.ejemplo.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF para pruebas API
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/**").permitAll() // Permitir peticiones al backend
            .anyRequest().authenticated()
        )
        .httpBasic(httpBasic -> httpBasic.disable()); // Deshabilitar el pop-up de login del navegador

    return http.build();
}

}







