// src/components/RespuestaForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RespuestaForm = ({ respuestaToEdit, onSave }) => {
  const [respuesta, setRespuesta] = useState({
    pregunta: '',
    respuesta: '',
  });

  useEffect(() => {
    if (respuestaToEdit) {
      setRespuesta(respuestaToEdit);
    }
  }, [respuestaToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuesta({ ...respuesta, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (respuesta.idResp) {
      axios.put(`/api/respuestas/editar/${respuesta.idResp}`, respuesta)
        .then(response => {
          onSave(response.data);
        })
        .catch(error => {
          console.error("Error al actualizar la respuesta", error);
        });
    } else {
      axios.post('/api/respuestas/guardar', respuesta)
        .then(response => {
          onSave(response.data);
        })
        .catch(error => {
          console.error("Error al guardar la respuesta", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Pregunta</label>
        <input
          type="text"
          name="pregunta"
          value={respuesta.pregunta}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Respuesta</label>
        <input
          type="text"
          name="respuesta"
          value={respuesta.respuesta}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default RespuestaForm;
