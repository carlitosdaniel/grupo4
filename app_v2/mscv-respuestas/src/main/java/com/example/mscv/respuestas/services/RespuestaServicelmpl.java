package com.example.mscv.respuestas.services;


import com.example.mscv.respuestas.entity.Respuesta;
import com.example.mscv.respuestas.repositories.RespuestaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RespuestaServicelmpl implements RespuestaService {
    @Autowired
    private RespuestaRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Respuesta> listar(){
        return (List<Respuesta>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Respuesta> porId(long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Respuesta guardar(Respuesta respuesta) {
        return repository.save(respuesta);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        repository.deleteById(id);
    }

}
