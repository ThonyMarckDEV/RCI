import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../js/urlHelper';
import { Search, Wifi, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductoCard from '../components/home/ProductoCard';
import { useFavoritos } from '../context/FavoritosContext'; // Contexto de favoritos
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';

const ProductosFavoritos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favoritos } = useFavoritos(); // Obtener la lista de favoritos del contexto

  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos();
  }, [favoritos]); // Dependencia de favoritos para actualizar la lista cuando cambie

  const fetchProductos = async () => {
    try {
      setLoading(true);

      // Obtener todos los productos del catálogo
      const response = await fetch(`${API_BASE_URL}/api/listarProductosCatalogo`);
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();

      // Filtrar los productos que están en la lista de favoritos
      const productosFavoritos = data.data.filter((producto) =>
        favoritos.includes(producto.nombreProducto)
      );

      setProductos(productosFavoritos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="flex-grow">
        {/* Header con resultados */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm mb-8">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-medium text-gray-900">
                  {productos.length} productos favoritos
                </h2>
              </div>
            </div>
          </div>
        </div>

        {productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-16">
            <Search className="w-16 h-16 mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold mb-2">No tienes productos favoritos</h3>
            <p className="text-gray-400">Agrega productos a favoritos para verlos aquí.</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"> {/* Agregado mb-12 para separar el Footer */}
            {/* Grid de productos favoritos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productos.map((producto) => (
                <ProductoCard key={producto.idProducto} producto={producto} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductosFavoritos;