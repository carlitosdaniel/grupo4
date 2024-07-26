// src/components/ExamenList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExamenList = ({ onEdit }) => {
  const [examenes, setExamenes] = useState([]);

  useEffect(() => {
    axios.get('/api/examenes')
      .then(response => {
        console.log(response.data); // Verificar datos recibidos
        setExamenes(response.data);
      })
      .catch(error => {
        console.error("Error al listar los exámenes", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/examenes/eliminar/${id}`)
      .then(() => {
        setExamenes(examenes.filter(examen => examen.idExamen !== id));
      })
      .catch(error => {
        console.error("Error al eliminar el examen", error);
      });
  };

  return (
    <div>
      <h2>Lista de Exámenes</h2>
      <ul>
        {examenes.map(examen => (
          <li key={examen.idExamen}>
            {examen.estado} - Nota: {examen.nota}
            <button onClick={() => onEdit(examen)}>Editar</button>
            <button onClick={() => handleDelete(examen.idExamen)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamenList;
