package com.ejemplo.examenes.mscv_examenes.models.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "examenes")
public class Examen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_examen") // Asegúrate de usar solo este nombre de columna
    private Long idExamen;

    private Long idResp;
    private Long idCurUsu;
    private String estado;
    private int nota;

    // Getters and Setters
    public Long getIdExamen() {
        return idExamen;
    }

    public void setIdExamen(Long idExamen) {
        this.idExamen = idExamen;
    }

    public Long getIdResp() {
        return idResp;
    }

    public void setIdResp(Long idResp) {
        this.idResp = idResp;
    }

    public Long getIdCurUsu() {
        return idCurUsu;
    }

    public void setIdCurUsu(Long idCurUsu) {
        this.idCurUsu = idCurUsu;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }
}
