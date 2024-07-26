package com.example.mscv.respuestas.controllers;

import com.example.mscv.respuestas.entity.Respuesta;
import com.example.mscv.respuestas.services.RespuestaService;
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
@RequestMapping("/api/respuestas")
public class RespuestaController {
    @Autowired
    private RespuestaService respuestaService;

    @GetMapping
    public List<Respuesta> listar() {
        return respuestaService.listar();
    }

    @GetMapping("/detalle/{id}")
    public ResponseEntity<?> obtenerRespuesta(@PathVariable Long id) {
        Optional<Respuesta> respuestaOptional = respuestaService.porId(id);
        if (respuestaOptional.isPresent()) {
            return ResponseEntity.ok().body(respuestaOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> crearRespuesta(@Valid @RequestBody Respuesta respuesta, BindingResult result) {
        if (result.hasErrors()) {
            return validar(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(respuestaService.guardar(respuesta));
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> actualizarRespuesta(@Valid @RequestBody Respuesta respuestas, BindingResult result, @PathVariable Long id) {
        if (result.hasErrors()) {
            return validar(result);
        }
        Optional<Respuesta> respuestaOptional = respuestaService.porId(id);
        if (respuestaOptional.isPresent()) {
            Respuesta respuestaActual = respuestaOptional.get();
            respuestaActual.setPregunta(respuestas.getPregunta());
            respuestaActual.setRespuesta(respuestas.getRespuesta());
            return ResponseEntity.status(HttpStatus.CREATED).body(respuestaService.guardar(respuestaActual));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarRespuesta(@PathVariable Long id) {
        Optional<Respuesta> respuestaOptional = respuestaService.porId(id);
        if (respuestaOptional.isPresent()) {
            respuestaService.eliminar(id);
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
