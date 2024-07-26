import React, { useState } from 'react';
import axios from 'axios';

// Componente para el formulario de creación de usuarios
const UsuarioForm = ({ onUsuarioCreado }) => {
  // Estados para almacenar el nombre, email y contraseña del nuevo usuario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Crear un objeto para el nuevo usuario con los datos ingresados
    const nuevoUsuario = { nombre, email, password };

    try {
      // Realizar una solicitud POST para guardar el nuevo usuario
      const response = await axios.post('/api/usuarios/guardar', nuevoUsuario);
      console.log('Usuario creado:', response.data);
      // Limpiar los campos de entrada del formulario
      setNombre('');
      setEmail('');
      setPassword('');
      // Llamar a la función para actualizar la lista de usuarios creados
      onUsuarioCreado();
    } catch (error) {
      console.error('Hubo un error al crear el usuario!', error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Título del formulario */}
      <h1>Crear Usuario</h1>
      
      {/* Formulario para crear el usuario */}
      <form onSubmit={handleSubmit}>
        
        {/* Campo de entrada para el nombre del usuario */}
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
        
        {/* Campo de entrada para el email del usuario */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {/* Campo de entrada para la contraseña del usuario */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn btn-primary">Crear Usuario</button>
      </form>
    </div>
  );
};

export default UsuarioForm;
