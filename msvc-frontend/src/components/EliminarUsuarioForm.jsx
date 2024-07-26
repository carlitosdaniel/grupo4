import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Componente para el formulario de eliminación de usuario de un curso
const EliminarUsuarioForm = ({ onUsuarioEliminado }) => {
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
      // Realizar una solicitud DELETE para eliminar el usuario del curso
      await axios.delete(`/api/eliminar-usuario/${cursoId}`, { data: usuario });
      // Limpiar el campo de selección de usuario
      setUsuarioId('');
      // Llamar a la función para actualizar la lista de usuarios eliminados
      onUsuarioEliminado();
    } catch (error) {
      console.error('Hubo un error al eliminar el usuario!', error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Título del formulario */}
      <h1>Eliminar Usuario de Curso</h1>
      
      {/* Formulario para eliminar el usuario */}
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
        <button type="submit" className="btn btn-primary">Eliminar Usuario</button>
      </form>
    </div>
  );
};

export default EliminarUsuarioForm;
