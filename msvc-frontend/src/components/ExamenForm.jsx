// src/components/ExamenForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamenForm = ({ examenToEdit, onSave }) => {
  const [examen, setExamen] = useState({
    idResp: '',
    idCurUsu: '',
    estado: '',
    nota: '',
  });

  useEffect(() => {
    if (examenToEdit) {
      setExamen(examenToEdit);
    }
  }, [examenToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamen({ ...examen, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (examen.idExamen) {
      axios.put(`/api/examenes/editar/${examen.idExamen}`, examen)
        .then(response => {
          onSave(response.data);
        })
        .catch(error => {
          console.error("Error al actualizar el examen", error);
        });
    } else {
      axios.post('/api/examenes/guardar', examen)
        .then(response => {
          onSave(response.data);
        })
        .catch(error => {
          console.error("Error al guardar el examen", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID Respuesta</label>
        <input
          type="text"
          name="idResp"
          value={examen.idResp}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>ID Curso Usuario</label>
        <input
          type="text"
          name="idCurUsu"
          value={examen.idCurUsu}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Estado</label>
        <input
          type="text"
          name="estado"
          value={examen.estado}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Nota</label>
        <input
          type="number"
          name="nota"
          value={examen.nota}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ExamenForm;
