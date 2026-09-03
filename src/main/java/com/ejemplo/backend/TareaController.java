package com.ejemplo.backend;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
public class TareaController {

    private final List<String> tareas = new ArrayList<>();

    public TareaController() {
        tareas.add("Aprender integración Angular + Spring Boot");
        tareas.add("Configurar puertos en Codespaces");
    }

    @GetMapping
    public List<String> obtenerTareas() {
        return tareas;
    }

    @PostMapping
    public List<String> agregarTarea(@RequestBody String nuevaTarea) {
        if (nuevaTarea != null && !nuevaTarea.trim().isEmpty()) {
            tareas.add(nuevaTarea.replace("\"", "")); // Limpia comillas extra si vienen del JSON
        }
        return tareas;
    }

    @DeleteMapping("/{index}")
    public List<String> eliminarTarea(@PathVariable int index) {
        if (index >= 0 && index < tareas.size()) {
            tareas.remove(index);
        }
        return tareas;
    }
}


