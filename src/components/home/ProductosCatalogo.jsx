import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../js/urlHelper';
import { Search, Wifi, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import ProductoCard from './ProductoCard';

const ProductosCatalogo = ({ filtros }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalProductos, setTotalProductos] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const categoria = new URLSearchParams(location.search).get('categoria');
  const nombreProducto = new URLSearchParams(location.search).get('nombre');

  useEffect(() => {
    fetchProductos();
  }, [filtros, paginaActual, categoria, nombreProducto]);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/listarProductosCatalogo?nombre=${nombreProducto || filtros.nombre}&categoria=${categoria || filtros.categoria}&page=${paginaActual}`
      );
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();
      setProductos(data.data || []);
      setTotalPaginas(data.last_page || 1);
      setTotalProductos(data.total || 0);
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
      const params = new URLSearchParams(location.search);
      params.set('page', pagina);
      navigate({ search: params.toString() });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center text-gray-500 py-16">
        <Wifi className="w-16 h-16 mb-4 text-gray-400" />
        <h3 className="text-2xl font-semibold mb-2">Error de conexión</h3>
        <p className="text-gray-400">No pudimos conectar con el servidor. Intenta de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[600px] bg-gray-50">
      
     {/* Header con resultados y filtros */}
      <div className="sticky top-36 z-10 bg-white border-b border-gray-100 shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-medium text-gray-900">
                {totalProductos} productos encontrados
              </h2>
              {(categoria || nombreProducto) && (
                <p className="text-sm text-gray-500 mt-1">
                  Mostrando resultados para {categoria && `categoría "${categoria}"`}
                  {categoria && nombreProducto && ' y '}
                  {nombreProducto && `búsqueda "${nombreProducto}"`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {productos.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-16">
          <Search className="w-16 h-16 mb-4 text-gray-400" />
          <h3 className="text-2xl font-semibold mb-2">No hay resultados</h3>
          <p className="text-gray-400">Intenta modificar los filtros de búsqueda</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <ProductoCard key={producto.idProducto} producto={producto} />
            ))}
          </div>

          {/* Paginación fija */}
          {totalPaginas > 1 && (
            <div className="sticky bottom-0 bg-white py-4 border-t border-gray-100 shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      paginaActual === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6" />
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
                            className={`px-4 py-2 mx-1 rounded-lg transition-colors ${paginaActual === page ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
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
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductosCatalogo;