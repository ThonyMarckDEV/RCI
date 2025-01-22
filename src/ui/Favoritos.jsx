import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../js/urlHelper';
import { Search, Wifi, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductoCard from '../components/home/ProductoCard';
import { useFavoritos } from '../context/FavoritosContext';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';

const ProductosFavoritos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalProductos, setTotalProductos] = useState(0);
  const { favoritos } = useFavoritos();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos();
  }, [favoritos, paginaActual]);

  const fetchProductos = async () => {
    try {
      setLoading(true);
     // console.log("Enviando favoritos:", favoritos);
  
      const response = await fetch(
        `${API_BASE_URL}/api/listarProductosFavoritos?page=${paginaActual}&perPage=5`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favoritos }),
        }
      );
  
     // console.log("Respuesta del servidor:", response);
  
      // Verificar el tipo de contenido de la respuesta
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text(); // Leer la respuesta como texto
        throw new Error(`La respuesta no es un JSON válido. Respuesta recibida: ${textResponse}`);
      }
  
      // Parsear la respuesta como JSON
      const data = await response.json();
     // console.log("Datos recibidos:", data);
  
      // Asegúrate de que `data.data` sea un array, incluso si está vacío
      setProductos(data.data || []);
      setTotalPaginas(data.last_page || 1);
      setTotalProductos(data.total || 0);
    } catch (err) {
      console.error("Error en la solicitud:", err);
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
      <div className="min-h-[600px] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Cargando productos favoritos...</p>
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow pt-20">
        <div className="px-6 pt-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-light text-gray-900 mb-6 text-center animate-fade-in-up">
            Favoritos
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mb-8 mx-auto animate-slide-up"></div>
        </div>

        {(!productos || productos.length === 0) ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-16">
          <Search className="w-16 h-16 mb-4 text-gray-400" />
          <h3 className="text-2xl font-semibold mb-2">No tienes productos favoritos</h3>
          <p className="text-gray-400">Agrega productos a favoritos para verlos aquí.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <ProductoCard key={producto.idProducto} producto={producto} />
            ))}
          </div>

            {totalPaginas > 1 && (
              <div className="mt-12 mb-8">
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

                  <button
                    onClick={() => handlePageChange(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    className={`p-2 rounded-lg ${paginaActual === totalPaginas ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductosFavoritos;