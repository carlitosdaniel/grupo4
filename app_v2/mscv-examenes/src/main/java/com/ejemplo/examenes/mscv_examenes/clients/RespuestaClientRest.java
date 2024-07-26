package com.ejemplo.examenes.mscv_examenes.clients;


import com.ejemplo.examenes.mscv_examenes.models.entity.Respuesta;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "mscv-respuestas", url = "localhost:8003")
public interface RespuestaClientRest {

    @GetMapping("/api/respuestas/detalle/{id}")
    Respuesta obtenerRespuesta(@PathVariable Long id);
}

