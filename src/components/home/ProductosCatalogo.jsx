// ProductosCatalogo.js
import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../js/urlHelper';
import { FaSearch, FaWifi } from 'react-icons/fa'; // Íconos para búsqueda vacía y error de conexión
import ProductoCard from './ProductoCard'; // Importa el componente ProductoCard

const ProductosCatalogo = ({ filtros }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    fetchProductos();
  }, [filtros, paginaActual]); // Recargar productos cuando cambien los filtros o la página

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/listarProductosCatalogo?nombreProducto=${filtros.nombre}&categoria=${filtros.categoria}&page=${paginaActual}`
      );
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();
      setProductos(data.data || []); // Asegúrate de que data.data sea un array
      setTotalPaginas(data.last_page || 1); // Total de páginas
    } catch (err) {
      setError(err.message); // Captura el error y lo guarda en el estado
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pagina) => {
    setPaginaActual(pagina);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 py-16">
        <FaWifi className="text-6xl mb-4" /> {/* Ícono de WiFi sin señal */}
        <p className="text-xl font-semibold">
          Error de conexión con el servidor
        </p>
        <p className="text-gray-400">Por favor, verifica tu conexión a internet e intenta nuevamente.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Lista de productos */}
      {productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <ProductoCard key={producto.idProducto} producto={producto} />
          ))}
        </div>
      ) : (
        // Mensaje cuando no se encuentran productos
        <div className="flex flex-col items-center justify-center text-gray-500 py-16">
          <FaSearch className="text-6xl mb-4" />
          <p className="text-xl font-semibold">
            No se encontraron productos con los filtros aplicados.
          </p>
          <p className="text-gray-400">Intenta modificar los criterios de búsqueda.</p>
        </div>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-lg shadow-sm">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-6 py-3 border-2 rounded-lg mx-1 ${
                  paginaActual === page
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                } transition-all duration-300`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductosCatalogo;