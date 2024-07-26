package com.ejemplo.examenes.mscv_examenes.services;


import com.ejemplo.examenes.mscv_examenes.models.entity.Examen;

import java.util.List;
import java.util.Optional;

public interface ExamenService {
    List<Examen> listar();
    Optional<Examen> porId(Long id);
    Examen guardar(Examen examen);
    void eliminar(Long id);
}

