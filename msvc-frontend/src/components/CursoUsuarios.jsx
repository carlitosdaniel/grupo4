import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

// Componente para gestionar usuarios de un curso
const CursoUsuarios = ({ cursoId, onUsuariosActualizados }) => {
  // Estados para almacenar la lista de usuarios del curso, todos los usuarios, y para controlar los modales
  const [usuarios, setUsuarios] = useState([]);
  const [allUsuarios, setAllUsuarios] = useState([]);
  const [showAddUsuarioModal, setShowAddUsuarioModal] = useState(false);
  const [showCreateUsuarioModal, setShowCreateUsuarioModal] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
  const [newUsuario, setNewUsuario] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  // Función para obtener los usuarios asignados al curso
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`/api/cursos/detalle/${cursoId}`);
      setUsuarios(response.data.usuarios || []);
    } catch (error) {
      console.error('Hubo un error al obtener los usuarios del curso!', error);
    }
  };

  // Función para obtener todos los usuarios
  const fetchAllUsuarios = async () => {
    try {
      const response = await axios.get('/api/usuarios');
      setAllUsuarios(response.data);
    } catch (error) {
      console.error('Hubo un error al obtener todos los usuarios!', error);
    }
  };

  // useEffect para obtener los usuarios al montar el componente y cuando cambia el cursoId
  useEffect(() => {
    fetchUsuarios();
    fetchAllUsuarios();
  }, [cursoId]);

  // Función para asignar un usuario al curso
  const handleAsignarUsuario = async () => {
    try {
      const usuario = { id: selectedUsuarioId };
      await axios.put(`/api/asignar-usuario/${cursoId}`, usuario);
      setShowAddUsuarioModal(false);
      onUsuariosActualizados(); 
      fetchUsuarios(); 
    } catch (error) {
      console.error('Hubo un error al asignar el usuario al curso!', error);
    }
  };

  // Función para crear un nuevo usuario y asignarlo al curso
  const handleCrearUsuario = async () => {
    try {
      await axios.post(`/api/crear-usuario/${cursoId}`, newUsuario);
      setShowCreateUsuarioModal(false);
      onUsuariosActualizados(); 
      fetchUsuarios(); 
    } catch (error) {
      console.error('Hubo un error al crear el usuario y asignarlo al curso!', error);
    }
  };

  // Función para eliminar un usuario del curso
  const handleEliminarUsuario = async (usuarioId) => {
    try {
      await axios.delete(`/api/eliminar-usuario/${cursoId}`, { data: { id: usuarioId } });
      onUsuariosActualizados(); 
      fetchUsuarios(); 
    } catch (error) {
      console.error('Hubo un error al eliminar el usuario del curso!', error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Título de la sección */}
      <h2>Usuarios del Curso</h2>
      {/* Botón para abrir el modal de asignar usuario */}
      <button className="btn btn-primary mb-3" onClick={() => setShowAddUsuarioModal(true)}>Asignar Usuario</button>
      {/* Botón para abrir el modal de crear y asignar usuario */}
      <button className="btn btn-secondary mb-3" onClick={() => setShowCreateUsuarioModal(true)}>Crear y Asignar Usuario</button>
      
      {/* Tabla para mostrar la lista de usuarios del curso */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                {/* Botón para eliminar el usuario del curso */}
                <button className="btn btn-danger" onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Asignar Usuario */}
      <Modal show={showAddUsuarioModal} onHide={() => setShowAddUsuarioModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Asignar Usuario al Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Seleccionar Usuario</label>
            {/* Dropdown para seleccionar un usuario */}
            <select className="form-control" onChange={(e) => setSelectedUsuarioId(e.target.value)} value={selectedUsuarioId}>
              <option value="">Seleccionar</option>
              {allUsuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddUsuarioModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAsignarUsuario}>
            Asignar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Crear Usuario */}
      <Modal show={showCreateUsuarioModal} onHide={() => setShowCreateUsuarioModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear y Asignar Usuario al Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Campos para crear un nuevo usuario */}
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={newUsuario.nombre}
              onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={newUsuario.email}
              onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={newUsuario.password}
              onChange={(e) => setNewUsuario({ ...newUsuario, password: e.target.value })}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateUsuarioModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCrearUsuario}>
            Crear y Asignar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CursoUsuarios;
