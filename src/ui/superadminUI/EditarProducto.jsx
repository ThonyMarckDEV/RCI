import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/superAdminComponents/SidebarSuperAdmin';
import SweetAlert from '../../components/SweetAlert';
import LoaderScreen from '../../components/home/LoadingScreen';
import API_BASE_URL from '../../js/urlHelper';
import { Link } from 'react-router-dom';
import EditarProducto from './ProductoEditarModal';

function EditarProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    cargarProductos(currentPage);
  }, [currentPage]);

  const cargarProductos = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_BASE_URL}/api/listarProductos?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al cargar productos');
      const data = await response.json();
      setProductos(data.data);
      setTotalPages(data.last_page);
    } catch (error) {
      SweetAlert.showMessageAlert('Error', 'Error al cargar productos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditarProducto = (producto) => {
    setSelectedProducto(producto);
  };

  const handleCloseModal = () => {
    setSelectedProducto(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Listar Productos</h1>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.idProducto}>
                    <td className="px-6 py-4 border-b border-gray-200">{producto.nombreProducto}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{producto.descripcion}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{producto.estado}</td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <button
                        onClick={() => handleEditarProducto(producto)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedProducto && (
        <EditarProducto producto={selectedProducto} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default EditarProductos;