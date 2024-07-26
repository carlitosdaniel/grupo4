package com.ejemplo.examenes.mscv_examenes.repositories;


import com.ejemplo.examenes.mscv_examenes.models.entity.Examen;
import org.springframework.data.repository.CrudRepository;

public interface ExamenRepository extends CrudRepository<Examen, Long> {
}
