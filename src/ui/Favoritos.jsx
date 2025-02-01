import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../js/urlHelper';
import { Search, Wifi } from 'lucide-react';
import ProductoCard from '../components/home/ProductoCard';
import { useFavoritos } from '../context/FavoritosContext';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';

const ProductosFavoritos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favoritos } = useFavoritos();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos();
  }, [favoritos]);

  const fetchProductos = async () => {
    try {
      setLoading(true);

      // Verificar que favoritos sea un array de strings válido
      if (!Array.isArray(favoritos) || favoritos.some(item => typeof item !== 'string')) {
        throw new Error('La lista de favoritos no es válida');
      }

      const response = await fetch(
        `${API_BASE_URL}/api/listarProductosFavoritos`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favoritos }),
        }
      );

      // Verificar el tipo de contenido de la respuesta
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text(); // Leer la respuesta como texto
        throw new Error(`La respuesta no es un JSON válido. Respuesta recibida: ${textResponse}`);
      }

      // Parsear la respuesta como JSON
      const data = await response.json();

      // Asegúrate de que `data.data` sea un array, incluso si está vacío
      setProductos(data.data || []);
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
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
      <div className="flex-grow pt-32"> {/* Aumenté el padding-top a pt-32 para mover el contenido más abajo */}
        <div className="px-6 pt-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-light text-gray-900 mb-6 text-center animate-fade-in-up">
            Favoritos
          </h1>
          <div className="w-24 h-1 bg-black mb-8 mx-auto animate-slide-up"></div>
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
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductosFavoritos;