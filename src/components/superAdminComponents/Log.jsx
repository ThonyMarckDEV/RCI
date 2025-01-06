import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Filter } from 'lucide-react';
import API_BASE_URL from '../../js/urlHelper';
import LoaderScreen from '../../components/home/LoadingScreen';
import jwtUtils from '../../utilities/jwtUtils';

  const Log = () => {
    const [logs, setLogs] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
      fecha_desde: '',
      fecha_hasta: '',
      usuario: '',
      accion: '',
      rol: '' // Nuevo filtro para el rol
    });
  
    const fetchLogs = async () => {
      setLoading(true); // Activar el loader
      try {
        const token = jwtUtils.getTokenFromCookie();
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE_URL}/api/logs?${queryParams}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error fetching logs');
        }
    
        const data = await response.json();
        setLogs(data.logs.data);
        setUsuarios(data.usuarios);
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setLoading(false); // Desactivar el loader
      }
    };
    
    useEffect(() => {
      fetchLogs();
    }, [filters]); // Ejecutar fetchLogs cada vez que cambien los filtros
  
    useEffect(() => {
      fetchLogs();
    }, [filters]);
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    if (loading) return <LoaderScreen />;
  
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Registro de Actividades</h1>
  
            {/* Filtros */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="fecha_desde"
                      value={filters.fecha_desde}
                      onChange={handleFilterChange}
                      className="pl-10 w-full rounded-md border border-gray-300 py-2"
                    />
                  </div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="fecha_hasta"
                      value={filters.fecha_hasta}
                      onChange={handleFilterChange}
                      className="pl-10 w-full rounded-md border border-gray-300 py-2"
                    />
                  </div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      name="usuario"
                      value={filters.usuario}
                      onChange={handleFilterChange}
                      className="pl-10 w-full rounded-md border border-gray-300 py-2"
                    >
                      <option value="">Todos los usuarios</option>
                      {usuarios.map(user => (
                        <option key={user.idUsuario} value={user.nombres}>
                          {user.nombres}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      name="rol"
                      value={filters.rol}
                      onChange={handleFilterChange}
                      className="pl-10 w-full rounded-md border border-gray-300 py-2"
                    >
                      <option value="">Todos los roles</option>
                      <option value="superadmin">superadmin</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Acción</label>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="accion"
                      value={filters.accion}
                      onChange={handleFilterChange}
                      placeholder="Buscar por acción..."
                      className="pl-10 w-full rounded-md border border-gray-300 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
  
            {/* Tabla de Logs */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {logs.map((log) => (
                      <tr key={log.idLog} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.idLog}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.nombres}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.rol}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{log.accion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(log.fecha).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Log;