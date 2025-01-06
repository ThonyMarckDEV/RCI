import React, { useState } from 'react';
import Sidebar from '../../components/superAdminComponents/SidebarSuperAdmin';
import API_BASE_URL from '../../js/urlHelper';
import SweetAlert from '../../components/SweetAlert';
import LoaderScreen from '../../components/home/LoadingScreen';
import jwtUtils from '../../utilities/jwtUtils';

function Configuracion() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      SweetAlert('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    const token = jwtUtils.getTokenFromCookie(); // Obtener el token
    const userId = jwtUtils.getIdUsuario(token); // Obtener el ID del token

    const requestBody = {
      password
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/password/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        SweetAlert.showMessageAlert('Success', 'Contraseña actualizada correctamente', 'success');
        setPassword('');
        setConfirmPassword('');
      } else {
        SweetAlert.showMessageAlert('Error', data.message || 'No se pudo actualizar la contraseña', 'error');
      }
    } catch (error) {
        SweetAlert.showMessageAlert('Error', 'Hubo un problema con la solicitud', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Cambiar Contraseña</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Repetir Contraseña</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </form>
        </div>
      </div>
      {loading && <LoaderScreen />}  
    </div>
  );
}

export default Configuracion;
