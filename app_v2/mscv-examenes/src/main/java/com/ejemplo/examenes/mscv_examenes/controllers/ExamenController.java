package com.ejemplo.examenes.mscv_examenes.controllers;

import com.ejemplo.examenes.mscv_examenes.models.entity.Examen;
import com.ejemplo.examenes.mscv_examenes.services.ExamenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/examenes")
public class ExamenController {
    @Autowired
    private ExamenService examenService;

    @GetMapping
    public List<Examen> listar() {
        return examenService.listar();
    }

    @GetMapping("/detalle/{id}")
    public ResponseEntity<?> obtenerExamen(@PathVariable Long id) {
        Optional<Examen> examenOptional = examenService.porId(id);
        if (examenOptional.isPresent()) {
            return ResponseEntity.ok().body(examenOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> crearExamen(@Valid @RequestBody Examen examen, BindingResult result) {
        if (result.hasErrors()) {
            return validar(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(examenService.guardar(examen));
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> actualizarExamen(@Valid @RequestBody Examen examen, BindingResult result, @PathVariable Long id) {
        if (result.hasErrors()) {
            return validar(result);
        }
        Optional<Examen> examenOptional = examenService.porId(id);
        if (examenOptional.isPresent()) {
            Examen examenActual = examenOptional.get();
            examenActual.setIdResp(examen.getIdResp());
            examenActual.setIdCurUsu(examen.getIdCurUsu());
            examenActual.setEstado(examen.getEstado());
            examenActual.setNota(examen.getNota());
            return ResponseEntity.status(HttpStatus.CREATED).body(examenService.guardar(examenActual));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarExamen(@PathVariable Long id) {
        Optional<Examen> examenOptional = examenService.porId(id);
        if (examenOptional.isPresent()) {
            examenService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private static ResponseEntity<Map<String, String>> validar(BindingResult result) {
        Map<String, String> errores = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errores.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }
}
