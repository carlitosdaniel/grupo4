# grupo4
Sistema Académico

# Proyecto de Gestión de un Sistema Académico
Este proyecto es una aplicación de gestión de cursos,usuarios, examenes y respuestas implementada utilizando una arquitectura de microservicios con Spring Boot para el backend y React para el frontend. La aplicación permite crear, editar, eliminar y visualizar usuarios, cursos, así como asignar y eliminar usuarios en cursos específicos, examenes y respuestas.

## Tecnologías Utilizadas
- **Backend:**
  - Spring Boot
  - Spring Data JPA
  - PostgreSQL
  - MySQL
  - OpenFeign
  - Hibernate
  - Maven

- **Frontend:**
  - React
  - Vite
  - Bootstrap
  - Axios
  - React Router

## Estructura del Proyecto

### Backend

- **msvc-usuarios:** Microservicio para la gestión de usuarios.
- **msvc-cursos:** Microservicio para la gestión de cursos.
- **msvc-examenes:** Microservicio para la gestión de examenes.
- **msvc-respuestas:** Microservicio para la gestión de respuestas.

### Frontend

- **msvc-frontend:** Interfaz gráfica de usuario para interactuar con los microservicios.

## Configuración y Ejecución

### Requisitos Previos

- Java 11 o superior
- Node.js y npm
- PostgreSQL
- MySQL

### Navega a cada microservicio y ejecuta cada uno de los Maven para iniciar el servidor:

- MsvcUsuariosApplication.java
- MsvcCursosApplication.java
- MsvcCursosApplication.java
- MsvcCursosApplication.java

### Configuración del Frontend
- cd msvc-frontend

- npm install
- Puedes instalar todos estos paquetes con el siguiente comando:
		- npm install react react-dom react-router-dom axios bootstrap react-bootstrap
- npm run dev

### Uso de la Aplicación
- Accede a la interfaz gráfica en tu navegador:
		- http://localhost:5173

