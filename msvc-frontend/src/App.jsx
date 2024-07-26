import React, { useState } from 'react';
import UsuarioList from './components/UsuarioList';
import UsuarioForm from './components/UsuarioForm';
import CursoList from './components/CursoList';
import CursoForm from './components/CursoForm';
import AsignarUsuarioForm from './components/AsignarUsuarioForm';
import EliminarUsuarioForm from './components/EliminarUsuarioForm';
import ExamenList from './components/ExamenList'; // Importar ExamenList
import ExamenForm from './components/ExamenForm'; // Importar ExamenForm
import RespuestaList from './components/RespuestaList'; // Importar RespuestaList
import RespuestaForm from './components/TempForm'; // Importar RespuestaForm
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Componente principal de la aplicación
const App = () => {
  // Estados para controlar si los usuarios y cursos han sido actualizados
  const [usuariosActualizados, setUsuariosActualizados] = useState(false);
  const [cursosActualizados, setCursosActualizados] = useState(false);
  const [examenToEdit, setExamenToEdit] = useState(null); // Estado para manejar la edición de exámenes
  const [respuestaToEdit, setRespuestaToEdit] = useState(null); // Estado para manejar la edición de respuestas

  // Función para manejar la actualización de usuarios
  const handleUsuarioActualizado = () => {
    setUsuariosActualizados(!usuariosActualizados);
  };

  // Función para manejar la actualización de cursos
  const handleCursoActualizado = () => {
    setCursosActualizados(!cursosActualizados);
  };

  // Función para manejar la edición de exámenes
  const handleEditExamen = (examen) => {
    setExamenToEdit(examen);
  };

  // Función para manejar la guarda de exámenes
  const handleSaveExamen = (examen) => {
    setExamenToEdit(null);
  };

  // Función para manejar la edición de respuestas
  const handleEditRespuesta = (respuesta) => {
    setRespuestaToEdit(respuesta);
  };

  // Función para manejar la guarda de respuestas
  const handleSaveRespuesta = (respuesta) => {
    setRespuestaToEdit(null);
  };

  return (
    <Router>
      <div className="container mt-5">
        {/* Navegación */}
        <nav>
          <ul>
            <li><Link to="/">Usuarios</Link></li>
            <li><Link to="/cursos">Cursos</Link></li>
            <li><Link to="/examenes">Exámenes</Link></li>
            <li><Link to="/respuestas">Respuestas</Link></li>
          </ul>
        </nav>
        
        {/* Rutas de la aplicación */}
        <Routes>
          {/* Ruta para la página de usuarios */}
          <Route
            path="/"
            element={
              <>
                {/* Formulario para crear un nuevo usuario */}
                <UsuarioForm onUsuarioCreado={handleUsuarioActualizado} />
                {/* Lista de usuarios */}
                <UsuarioList onUsuarioEliminado={handleUsuarioActualizado} key={usuariosActualizados} />
              </>
            }
          />
          
          {/* Ruta para la página de cursos */}
          <Route
            path="/cursos"
            element={
              <>
                {/* Formulario para crear un nuevo curso */}
                <CursoForm onCursoCreado={handleCursoActualizado} />
                {/* Lista de cursos */}
                <CursoList onCursoEliminado={handleCursoActualizado} key={cursosActualizados} />
              </>
            }
          />
          
          {/* Ruta para asignar un usuario a un curso */}
          <Route
            path="/asignar-usuario/:cursoId"
            element={<AsignarUsuarioForm onUsuarioAsignado={handleCursoActualizado} />}
          />
          
          {/* Ruta para eliminar un usuario de un curso */}
          <Route
            path="/eliminar-usuario/:cursoId"
            element={<EliminarUsuarioForm onUsuarioEliminado={handleCursoActualizado} />}
          />

          {/* Ruta para la página de exámenes */}
          <Route
            path="/examenes"
            element={
              <>
                <h1>Gestión de Exámenes</h1>
                <ExamenForm examenToEdit={examenToEdit} onSave={handleSaveExamen} />
                <ExamenList onEdit={handleEditExamen} />
              </>
            }
          />

          {/* Ruta para la página de respuestas */}
          <Route
            path="/respuestas"
            element={
              <>
                <h1>Gestión de Respuestas</h1>
                <RespuestaForm respuestaToEdit={respuestaToEdit} onSave={handleSaveRespuesta} />
                <RespuestaList onEdit={handleEditRespuesta} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
