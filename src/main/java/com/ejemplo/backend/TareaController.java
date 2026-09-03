package com.ejemplo.backend;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
public class TareaController {

    private final TareaRepository repository;

    public TareaController(TareaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Tarea> obtenerTareas() {
        return repository.findAll();
    }

    @PostMapping
    public Tarea agregarTarea(@RequestBody Tarea nuevaTarea) {
        return repository.save(nuevaTarea);
    }

    @DeleteMapping("/{id}")
    public void eliminarTarea(@PathVariable Long id) {
        repository.deleteById(id);
    }
}

