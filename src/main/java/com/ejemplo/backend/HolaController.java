package com.ejemplo.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HolaController {

    @GetMapping("/saludo")
    public Map<String, String> obtenerSaludo() {
        return Map.of("mensaje", "Hola desde el backend en Spring Boot");
    }
}


