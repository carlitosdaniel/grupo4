package com.ejemplo.examenes.mscv_examenes.models.entity;


public class Respuesta {
    private Long idResp;
    private String pregunta;
    private String respuesta;

    // Getters and Setters
    public Long getIdResp() {
        return idResp;
    }

    public void setIdResp(Long idResp) {
        this.idResp = idResp;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }
}

