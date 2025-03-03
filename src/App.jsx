import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import API_BASE_URL from './js/urlHelper';
import WhatsAppIcon from './components/home/WhatsAppIcon'; // Asegúrate de importar el icono de WhatsApp
import jwtUtils from './utilities/jwtUtils';
import ErrorPage from './components/home/ErrorPage'; // Asegúrate de que la ruta sea correcta
import { FavoritosProvider } from './context/FavoritosContext';
import ScrollToTopButton from './components/home/ScrollToTopButton';

// Componentes Home
import Home from './ui/Home';
import EcoAmigable from './ui/EcoAmigable';
import LaEmpresa from './ui/LaEmpresa';
import Clientes from './ui/Clientes';
import Contacto from './ui/Contacto';
import Catalogo from './ui/Catalogo';
import Favoritos from './ui/Favoritos';

// UIS
import Login from './ui/Login';

  //UI SUPER ADMIN
  import SuperAdminDashboard from './ui/superadminUI/Dashboard';
  import AgregarUsuario from './ui/superadminUI/AgregarUsuario';
  import EditarUsuario from './ui/superadminUI/EditarUsuario';
  import AgregarProducto from './ui/superadminUI/AgregarProducto';
  import EditarProducto from './ui/superadminUI/EditarProducto';
  import AgregarCategoria from './ui/superadminUI/AgregarCategoria';
  import EditarCategoria from './ui/superadminUI/EditarCategoria';
  import Configuracion from './components/superAdminComponents/Configuracion';
  
  //UI ADMIN
  import AgregarProductoAdmin from './ui/adminUI/AgregarProductoAdmin';
  import EditarProductoAdmin from './ui/adminUI/EditarProductoAdmin';

// Utilities
import ProtectedRouteHome from './utilities/ProtectedRouteHome';
import ProtectedRouteRolSuperAdmin from './utilities/ProtectedRouteRolSuperAdmin';
import ProtectedRouteRolAdmin from './utilities/ProtectedRouteRolAdmin';


// Scripts
 import { updateLastActivity } from './js/lastActivity';

function AppContent() {
  const location = useLocation();
  const [globalError, setGlobalError] = useState(null);

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
  
    // Capturar errores globales
    useEffect(() => {
      const handleGlobalError = (event) => {
        const newError = {
          message: event.error?.message || 'Error desconocido',
          severity: 'critical',
          location: event.filename || 'Unknown location',
          timestamp: new Date().toISOString(),
          stack: event.error?.stack,
          user: 'Usuario actual'
        };
        setGlobalError(newError);
      };

      const handleUnhandledRejection = (event) => {
        const newError = {
          message: event.reason?.message || 'Promise rejection no manejada',
          severity: 'warning',
          location: 'Promise rejection',
          timestamp: new Date().toISOString(),
          stack: event.reason?.stack,
          user: 'Usuario actual'
        };
        setGlobalError(newError);
      };
  
      window.addEventListener('error', handleGlobalError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
  
      return () => {
        window.removeEventListener('error', handleGlobalError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }, []);

    return (
        <Routes>
          <Route path="/" element={<ProtectedRouteHome element={<><WhatsAppIcon /><ScrollToTopButton /><Home /></>} />} />
          <Route path="/ecoAmigable" element={<ProtectedRouteHome element={<><WhatsAppIcon /><ScrollToTopButton /><EcoAmigable /></>} />} />
          <Route path="/laEmpresa" element={<ProtectedRouteHome element={<><WhatsAppIcon /><ScrollToTopButton /><LaEmpresa /></>} />} />
          <Route path="/clientes" element={<ProtectedRouteHome element={<><WhatsAppIcon /><ScrollToTopButton /><Clientes /></>} />} />
          <Route path="/contacto" element={<ProtectedRouteHome element={<><WhatsAppIcon /><ScrollToTopButton /><Contacto /></>} />} />
          <Route path="/catalogo" element={<ProtectedRouteHome element={<><WhatsAppIcon /><ScrollToTopButton /><Catalogo /></>} />} />
          <Route path="/favoritos" element={<ProtectedRouteHome element={<><WhatsAppIcon /><ScrollToTopButton /><Favoritos /></>} />} />

          <Route path="/login" element={<ProtectedRouteHome element={<Login />} />} />
  
          {/* Rutas SuperAdmin */}
          <Route path="/superAdmin/dashboard" element={<ProtectedRouteRolSuperAdmin element={<SuperAdminDashboard />} />} />
          <Route path="/superAdmin/usuarios/agregar" element={<ProtectedRouteRolSuperAdmin element={<AgregarUsuario />} />} />
          <Route path="/superAdmin/usuarios/editar" element={<ProtectedRouteRolSuperAdmin element={<EditarUsuario />} />} />
          <Route path="/superAdmin/productos/agregar" element={<ProtectedRouteRolSuperAdmin element={<AgregarProducto />} />} />
          <Route path="/superAdmin/productos/editar" element={<ProtectedRouteRolSuperAdmin element={<EditarProducto />} />} />
          <Route path="/superAdmin/categorias/agregar" element={<ProtectedRouteRolSuperAdmin element={<AgregarCategoria />} />} />
          <Route path="/superAdmin/categorias/editar" element={<ProtectedRouteRolSuperAdmin element={<EditarCategoria />} />} />
          <Route path="/superAdmin/configuracion" element={<ProtectedRouteRolSuperAdmin element={<Configuracion />} />} />
  
          {/* Rutas Admin */}
          <Route path="/admin/productos/agregar" element={<ProtectedRouteRolAdmin element={<AgregarProductoAdmin />} />} />
          <Route path="/admin/productos/editar" element={<ProtectedRouteRolAdmin element={<EditarProductoAdmin />} />} />
  
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
  }
  
  function App() {
    return (
      <FavoritosProvider>
        <Router>
          <AppContent />
        </Router>
      </FavoritosProvider>
    );
  }
  
  export default App;