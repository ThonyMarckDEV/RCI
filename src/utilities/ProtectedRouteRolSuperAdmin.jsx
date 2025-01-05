// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtUtils from '../utilities/jwtUtils'; // Utilidad para emailVerified

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const ProtectedRouteRolSuperAdmin = ({ element }) => {
  // Obtener el JWT desde la cookie
  const token = getCookie('jwt');

  if (!token) {
    // Si no hay token, redirigir al login
    return <Navigate to="/" />;
  }

  try {
    // Decodificar el JWT
    const userRole = jwtUtils.getUserRole(token); // Extraer el rol del token

    if (userRole === 'admin') {
      return <Navigate to="/admin" />;
    }
    return element;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return <Navigate to="/" />; // Token inválido
  }
};

export default ProtectedRouteRolSuperAdmin;
