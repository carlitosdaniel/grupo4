package com.example.mscv.respuestas.services;

import com.example.mscv.respuestas.entity.Respuesta;

import java.util.List;
import java.util.Optional;

public interface RespuestaService {
        List<Respuesta> listar();
        Optional<Respuesta> porId(long id);
        Respuesta guardar(Respuesta respuesta);
        void eliminar(Long id);
    }
