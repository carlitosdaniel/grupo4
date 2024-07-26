import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Componente para el formulario de asignación de usuario a un curso
const AsignarUsuarioForm = ({ onUsuarioAsignado }) => {
  // Obtener el cursoId de los parámetros de la URL
  const { cursoId } = useParams();

  // Estado para almacenar la lista de usuarios y el ID del usuario seleccionado
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');

  // useEffect para obtener la lista de usuarios al montar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Realizar una solicitud GET para obtener los usuarios
        const response = await axios.get('/api/usuarios');
        // Actualizar el estado con los datos obtenidos
        setUsuarios(response.data);
      } catch (error) {
        console.error('Hubo un error al obtener los usuarios!', error);
      }
    };

    // Llamar a la función para obtener los usuarios
    fetchUsuarios();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Crear un objeto usuario con el ID seleccionado
    const usuario = { id: usuarioId };

    try {
      // Realizar una solicitud PUT para asignar el usuario al curso
      await axios.put(`/api/asignar-usuario/${cursoId}`, usuario);
      // Limpiar el campo de selección de usuario
      setUsuarioId('');
      // Llamar a la función para actualizar la lista de usuarios asignados
      onUsuarioAsignado();
    } catch (error) {
      console.error('Hubo un error al asignar el usuario!', error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Título del formulario */}
      <h1>Asignar Usuario a Curso</h1>
      
      {/* Formulario para asignar el usuario */}
      <form onSubmit={handleSubmit}>
        
        {/* Campo de selección de usuario */}
        <div className="mb-3">
          <label className="form-label">Seleccionar Usuario</label>
          <select
            className="form-control"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            required
          >
            <option value="">Seleccione un usuario</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre} ({usuario.email})
              </option>
            ))}
          </select>
        </div>
        
        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn btn-primary">Asignar Usuario</button>
      </form>
    </div>
  );
};

export default AsignarUsuarioForm;
