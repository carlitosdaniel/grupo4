import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

// Componente para listar y gestionar usuarios
const UsuarioList = ({ onUsuarioEliminado }) => {
  // Estados para almacenar la lista de usuarios, el usuario seleccionado, y para controlar los modales
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUsuario, setEditedUsuario] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  // Función para obtener la lista de usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Hubo un error al obtener los usuarios!', error);
    }
  };

  // useEffect para obtener la lista de usuarios al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Función para eliminar un usuario
  const handleEliminar = async (id) => {
    try {
      await axios.delete(`/api/usuarios/eliminar/${id}`);
      onUsuarioEliminado(); // Llamar a la función para actualizar la lista
    } catch (error) {
      console.error('Hubo un error al eliminar el usuario!', error);
    }
  };

  // Función para mostrar los detalles de un usuario
  const handleShowDetails = (usuario) => {
    setSelectedUsuario(usuario);
    setShowDetailsModal(true);
  };

  // Función para cerrar el modal de detalles
  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedUsuario(null);
  };

  // Función para mostrar el modal de edición
  const handleShowEdit = (usuario) => {
    setEditedUsuario({ ...usuario });
    setShowEditModal(true);
  };

  // Función para cerrar el modal de edición
  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditedUsuario({
      nombre: '',
      email: '',
      password: ''
    });
  };

  // Función para manejar los cambios en el formulario de edición
  const handleEditChange = (e) => {
    setEditedUsuario({
      ...editedUsuario,
      [e.target.name]: e.target.value
    });
  };

  // Función para enviar el formulario de edición
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/usuarios/editar/${editedUsuario.id}`, editedUsuario);
      setShowEditModal(false);
      onUsuarioEliminado(); // Llamar a la función para actualizar la lista
    } catch (error) {
      console.error('Hubo un error al actualizar el usuario!', error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Título de la lista de usuarios */}
      <h1>Lista de Usuarios</h1>
      
      {/* Tabla para mostrar la lista de usuarios */}
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
                {/* Botones de acciones para cada usuario */}
                <button className="btn btn-info me-2" onClick={() => handleShowDetails(usuario)}>Detalles</button>
                <button className="btn btn-warning me-2" onClick={() => handleShowEdit(usuario)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Detalles */}
      <Modal show={showDetailsModal} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUsuario && (
            <div>
              <p><strong>ID:</strong> {selectedUsuario.id}</p>
              <p><strong>Nombre:</strong> {selectedUsuario.nombre}</p>
              <p><strong>Email:</strong> {selectedUsuario.email}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Editar */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={editedUsuario.nombre}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={editedUsuario.email}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={editedUsuario.password}
                onChange={handleEditChange}
                required
              />
            </div>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UsuarioList;
