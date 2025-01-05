import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import API_BASE_URL from './js/urlHelper';
import WhatsAppIcon from './components/home/WhatsAppIcon'; // Asegúrate de importar el icono de WhatsApp
import jwtUtils from './utilities/jwtUtils';
import ErrorPage from './components/home/ErrorPage'; // Asegúrate de que la ruta sea correcta

// Componentes Home
import Home from './ui/Home';
import EcoAmigable from './ui/EcoAmigable';
import LaEmpresa from './ui/LaEmpresa';
import Clientes from './ui/Clientes';
import Contacto from './ui/Contacto';
import Catalogo from './ui/Catalogo';

// UIS
import Login from './ui/Login';

  //UI SUPER ADMIN
  import SuperAdmin from './ui/superadminUI/SuperAdmin';
  import AgregarUsuario from './ui/superadminUI/AgregarUsuario';
  import EditarUsuario from './ui/superadminUI/EditarUsuario';
  import AgregarProducto from './ui/superadminUI/AgregarProducto';
  import EditarProducto from './ui/superadminUI/EditarProducto';
  import AgregarCategoria from './ui/superadminUI/AgregarCategoria';
  import EditarCategoria from './ui/superadminUI/EditarCategoria';


// Utilities
import ProtectedRouteHome from './utilities/ProtectedRouteHome';
import ProtectedRouteRolSuperAdmin from './utilities/ProtectedRouteRolSuperAdmin';
import ProtectedRouteToken from './utilities/ProtectedRouteToken';
import ProtectedRouteRolAdmin from './utilities/ProtectedRouteRolAdmin';


// Scripts
 import { updateLastActivity } from './js/lastActivity';


function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const token = jwtUtils.getTokenFromCookie();
  
    if (token) {
      updateLastActivity();
  
      const intervalId = setInterval(() => {
        updateLastActivity();
      }, 10000);
  
      return () => clearInterval(intervalId);
    }
  }, [location.pathname]);
  

  return (
    <Routes>
        {/* Componente de WhatsApp en todas las páginas */}
        
      <Route path="/" element={<ProtectedRouteHome element={<><WhatsAppIcon /><Home /></>} />} />
      <Route path="/ecoAmigable" element={<ProtectedRouteHome element={<><WhatsAppIcon /><EcoAmigable /></>} />} />
      <Route path="/laEmpresa" element={<ProtectedRouteHome element={<><WhatsAppIcon /><LaEmpresa /></>} />} />
      <Route path="/clientes" element={<ProtectedRouteHome element={<><WhatsAppIcon /><Clientes /></>} />} />
      <Route path="/contacto" element={<ProtectedRouteHome element={<><WhatsAppIcon /><Contacto /></>} />} />
      <Route path="/catalogo" element={<ProtectedRouteHome element={<><WhatsAppIcon /><Catalogo /></>} />} />

      <Route path="/login" element={<ProtectedRouteHome element={<Login />} />} />

      {/* Rutas SuperAdmin */}
      <Route path="/superAdmin" element={<ProtectedRouteRolSuperAdmin element={<SuperAdmin />} />} />
      <Route path="/superAdmin/usuarios/agregar" element={<ProtectedRouteRolSuperAdmin element={<AgregarUsuario />} />} />
      <Route path="/superAdmin/usuarios/editar" element={<ProtectedRouteRolSuperAdmin element={<EditarUsuario />} />} />
      <Route path="/superAdmin/productos/agregar" element={<ProtectedRouteRolSuperAdmin element={<AgregarProducto />} />} />
      <Route path="/superAdmin/productos/editar" element={<ProtectedRouteRolSuperAdmin element={<EditarProducto />} />} />
      <Route path="/superAdmin/categorias/agregar" element={<ProtectedRouteRolSuperAdmin element={<AgregarCategoria />} />} />
      <Route path="/superAdmin/categorias/editar" element={<ProtectedRouteRolSuperAdmin element={<EditarCategoria />} />} />

      <Route path="*" element={<ErrorPage />} />
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
