import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  // Importa useLocation
import API_BASE_URL from '../../js/urlHelper';
import { FaSearch, FaWifi, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductoCard from './ProductoCard';

const ProductosCatalogo = ({ filtros }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  
  const location = useLocation();  // Obtén la ubicación actual de la URL
  const categoria = new URLSearchParams(location.search).get('categoria'); // Extrae el parámetro 'categoria' de la URL

  useEffect(() => {
    fetchProductos();
  }, [filtros, paginaActual, categoria]);  // Incluye 'categoria' como dependencia

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/listarProductosCatalogo?nombre=${filtros.nombre}&categoria=${categoria || filtros.categoria}&page=${paginaActual}`
      );
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();
      setProductos(data.data || []); // Asegúrate de que data.data sea un array
      setTotalPaginas(data.last_page || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        <FaWifi className="text-6xl mb-4" />
        <p className="text-xl font-semibold">
          Error de conexión con el servidor
        </p>
      </div>
    );
  }

  // Dividir los productos en dos grupos: primeros 3 y siguientes 3
  const primerosTresProductos = productos.slice(0, 3);
  const siguientesTresProductos = productos.slice(3, 6);

  return (
    <div className="flex flex-col min-h-[500px]">
      {/* Mostrar mensaje si no hay productos */}
      {productos.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-16">
          <FaSearch className="text-6xl mb-4" />
          <p className="text-xl font-semibold">
            No se encontraron productos con los filtros aplicados.
          </p>
          <p className="text-gray-400">Intenta modificar los criterios de búsqueda.</p>
        </div>
      ) : (
        <>
          {/* Primera fila de productos (primeros 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {primerosTresProductos.map((producto) => (
              <ProductoCard key={producto.idProducto} producto={producto} />
            ))}
          </div>

          {/* Segunda fila de productos (siguientes 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {siguientesTresProductos.map((producto) => (
              <ProductoCard key={producto.idProducto} producto={producto} />
            ))}
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 mt-8">
              <div className="flex justify-center items-center space-x-2">
                {/* Botón anterior */}
                <button
                  onClick={() => handlePageChange(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className={`p-2 rounded-lg ${paginaActual === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>

                {/* Números de página */}
                <div className="flex items-center">
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                    .filter(page => page === 1 || page === totalPaginas || (page >= paginaActual - 1 && page <= paginaActual + 1))
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && <span className="px-2 text-gray-400">...</span>}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 mx-1 rounded-lg transition-colors ${paginaActual === page ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}
                </div>

                {/* Botón siguiente */}
                <button
                  onClick={() => handlePageChange(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className={`p-2 rounded-lg ${paginaActual === totalPaginas ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductosCatalogo;
