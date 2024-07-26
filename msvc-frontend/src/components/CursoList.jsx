import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Componente para listar y gestionar cursos
const CursoList = ({ onCursoEliminado }) => {
  const [cursos, setCursos] = useState([]); // Estado para almacenar la lista de cursos
  const [selectedCurso, setSelectedCurso] = useState(null); // Estado para almacenar el curso seleccionado
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Estado para controlar la visibilidad del modal de detalles
  const [showEditModal, setShowEditModal] = useState(false); // Estado para controlar la visibilidad del modal de edición
  const [editedCurso, setEditedCurso] = useState({ nombre: '' }); // Estado para almacenar el curso editado
  const [usuariosInscritos, setUsuariosInscritos] = useState([]); // Estado para almacenar los usuarios inscritos en un curso

  // Función para obtener la lista de cursos
  const fetchCursos = async () => {
    try {
      const response = await axios.get('/api/cursos');
      setCursos(response.data); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error('Hubo un error al obtener los cursos!', error);
    }
  };

  // useEffect para obtener la lista de cursos al montar el componente
  useEffect(() => {
    fetchCursos();
  }, []);

  // Función para eliminar un curso
  const handleEliminar = async (id) => {
    try {
      await axios.delete(`/api/cursos/eliminar/${id}`);
      onCursoEliminado(); // Llamar a la función para actualizar la lista
    } catch (error) {
      console.error('Hubo un error al eliminar el curso!', error);
    }
  };

  // Función para mostrar los detalles de un curso
  const handleShowDetails = async (curso) => {
    try {
      const response = await axios.get(`/api/cursos/detalle/${curso.id}`);
      const cursoData = response.data;
      const usuariosResponse = await axios.get(`/api/usuarios`);
      const usuariosInscritos = usuariosResponse.data.filter(usuario => 
        cursoData.cursoUsuarios.some(cursoUsuario => cursoUsuario.usuarioId === usuario.id)
      );
      setSelectedCurso(cursoData);
      setUsuariosInscritos(usuariosInscritos);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Hubo un error al obtener los detalles del curso!', error);
    }
  };

  // Función para cerrar el modal de detalles
  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedCurso(null);
    setUsuariosInscritos([]);
  };

  // Función para mostrar el modal de edición
  const handleShowEdit = (curso) => {
    setEditedCurso({ ...curso });
    setShowEditModal(true);
  };

  // Función para cerrar el modal de edición
  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditedCurso({ nombre: '' });
  };

  // Función para manejar los cambios en el formulario de edición
  const handleEditChange = (e) => {
    setEditedCurso({
      ...editedCurso,
      [e.target.name]: e.target.value
    });
  };

  // Función para enviar el formulario de edición
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/cursos/editar/${editedCurso.id}`, editedCurso);
      setShowEditModal(false);
      onCursoEliminado(); // Llamar a la función para actualizar la lista
    } catch (error) {
      console.error('Hubo un error al actualizar el curso!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Lista de Cursos</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map(curso => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.nombre}</td>
              <td>
                <button className="btn btn-info me-2" onClick={() => handleShowDetails(curso)}>Detalles</button>
                <button className="btn btn-warning me-2" onClick={() => handleShowEdit(curso)}>Editar</button>
                <button className="btn btn-danger me-2" onClick={() => handleEliminar(curso.id)}>Eliminar</button>
                <Link to={`/asignar-usuario/${curso.id}`} className="btn btn-success me-2">Asignar Usuario</Link>
                <Link to={`/eliminar-usuario/${curso.id}`} className="btn btn-secondary">Eliminar Usuario</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Detalles */}
      <Modal show={showDetailsModal} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCurso && (
            <div>
              <p><strong>ID:</strong> {selectedCurso.id}</p>
              <p><strong>Nombre:</strong> {selectedCurso.nombre}</p>
              <h5>Usuarios Inscritos:</h5>
              <ul>
                {usuariosInscritos.map(usuario => (
                  <li key={usuario.id}>
                    {usuario.nombre} ({usuario.email})
                  </li>
                ))}
              </ul>
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
          <Modal.Title>Editar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={editedCurso.nombre}
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

export default CursoList;
