import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import API_BASE_URL from './js/urlHelper';

// Componentes Home
import Home from './ui/Home';
import EcoAmigable from './ui/EcoAmigable';
import LaEmpresa from './ui/LaEmpresa';
import Clientes from './ui/Clientes';


// UIS


// Utilities
import ProtectedRouteHome from './utilities/ProtectedRouteHome';
import ProtectedRouteRolSuperAdmin from './utilities/ProtectedRouteRolSuperAdmin';
import ProtectedRouteToken from './utilities/ProtectedRouteToken';
import ProtectedRouteRolAdmin from './utilities/ProtectedRouteRolAdmin';


// Scripts
 import { updateLastActivity } from './js/lastActivity';



function AppContent() {
  // const location = useLocation();


  // Actualizar la actividad del usuario si no está en mantenimiento
  // useEffect(() => {
  //   const token = localStorage.getItem('jwt');
  //   if (!enMantenimiento && token) {

  //     updateLastActivity();
        
  //       const intervalId = setInterval(() => {
  //         updateLastActivity();
  //       }, 10000);

  //       return () => clearInterval(intervalId);
  //   }
  // }, [location.pathname, enMantenimiento]);


  return (
    <Routes>
  
      <Route path="/" element={<ProtectedRouteHome element={<Home />} />} />
      <Route path="/ecoAmigable" element={<ProtectedRouteHome element={<EcoAmigable />} />} />
      <Route path="/laEmpresa" element={<ProtectedRouteHome element={<LaEmpresa />} />} />
      <Route path="/clientes" element={<ProtectedRouteHome element={<Clientes />} />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
        <AppContent />
    </Router>
  );
}

export default App;
