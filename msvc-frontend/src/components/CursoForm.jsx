import React, { useState } from 'react';
import axios from 'axios';

// Componente para el formulario de creación de cursos
const CursoForm = ({ onCursoCreado }) => {
  // Estado para almacenar el nombre del nuevo curso
  const [nombre, setNombre] = useState('');

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Crear un objeto para el nuevo curso con el nombre ingresado
    const nuevoCurso = { nombre };

    try {
      // Realizar una solicitud POST para guardar el nuevo curso
      const response = await axios.post('/api/cursos/guardar', nuevoCurso);
      console.log('Curso creado:', response.data);
      // Limpiar el campo de entrada del nombre del curso
      setNombre('');
      // Llamar a la función para actualizar la lista de cursos creados
      onCursoCreado();
    } catch (error) {
      console.error('Hubo un error al crear el curso!', error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Título del formulario */}
      <h1>Crear Curso</h1>
      
      {/* Formulario para crear el curso */}
      <form onSubmit={handleSubmit}>
        
        {/* Campo de entrada para el nombre del curso */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        
        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn btn-primary">Crear Curso</button>
      </form>
    </div>
  );
};

export default CursoForm;
