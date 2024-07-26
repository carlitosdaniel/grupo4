// src/components/RespuestaList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RespuestaList = ({ onEdit }) => {
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    axios.get('/api/respuestas')
      .then(response => {
        setRespuestas(response.data);
      })
      .catch(error => {
        console.error("Error al listar las respuestas", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/respuestas/eliminar/${id}`)
      .then(() => {
        setRespuestas(respuestas.filter(respuesta => respuesta.idResp !== id));
      })
      .catch(error => {
        console.error("Error al eliminar la respuesta", error);
      });
  };

  return (
    <div>
      <h2>Lista de Respuestas</h2>
      <ul>
        {respuestas.map(respuesta => (
          <li key={respuesta.idResp}>
            {respuesta.pregunta} - {respuesta.respuesta}
            <button onClick={() => onEdit(respuesta)}>Editar</button>
            <button onClick={() => handleDelete(respuesta.idResp)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RespuestaList;
