import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite para un proyecto React
export default defineConfig({
  // Plugins utilizados en el proyecto
  plugins: [react()],
  
  // Configuración del servidor de desarrollo
  server: {
    // Proxy para redirigir solicitudes API durante el desarrollo
    proxy: {
      // Proxy para las solicitudes relacionadas con usuarios
      '/api/usuarios': {
        target: 'http://localhost:8001', // Dirección del servidor de usuarios
        changeOrigin: true, // Cambiar el origen de la solicitud al destino
        secure: false, // Permitir solicitudes no seguras
      },
      // Proxy para las solicitudes relacionadas con cursos
      '/api/cursos': {
        target: 'http://localhost:8002', // Dirección del servidor de cursos
        changeOrigin: true, // Cambiar el origen de la solicitud al destino
        secure: false, // Permitir solicitudes no seguras
      },
      // Proxy para las solicitudes de asignar usuario a un curso
      '/api/asignar-usuario': {
        target: 'http://localhost:8002', // Dirección del servidor para asignar usuarios
        changeOrigin: true, // Cambiar el origen de la solicitud al destino
        secure: false, // Permitir solicitudes no seguras
      },
      // Proxy para las solicitudes de eliminar usuario de un curso
      '/api/eliminar-usuario': {
        target: 'http://localhost:8002', // Dirección del servidor para eliminar usuarios
        changeOrigin: true, // Cambiar el origen de la solicitud al destino
        secure: false, // Permitir solicitudes no seguras
      },
      '/api/examenes': {
        target: 'http://localhost:8005',
        changeOrigin: true,
        secure: false,
      },
      '/api/respuestas': {
        target: 'http://localhost:8003', // Dirección del servidor de respuestas
        changeOrigin: true, // Cambiar el origen de la solicitud al destino
        secure: false, // Permitir solicitudes no seguras
      },

    },
  },
});
