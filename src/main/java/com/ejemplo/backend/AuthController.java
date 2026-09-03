package com.ejemplo.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Validación de credenciales de prueba
        if ("admin".equals(username) && "1234".equals(password)) {
            // Regresamos un token simulado
            return ResponseEntity.ok(Map.of("token", "Bearer token-secreto-12345", "username", username));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Usuario o contraseña incorrectos"));
    }
}


