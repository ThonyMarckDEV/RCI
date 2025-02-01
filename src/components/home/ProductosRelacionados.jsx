import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../js/urlHelper';
import { Search, Wifi } from 'lucide-react';
import ProductoCard from '../../components/home/ProductoCard';
import { useFavoritos } from '../../context/FavoritosContext';
import Navbar from '../../components/home/NavBar';
import Footer from '../../components/home/Footer';

const ProductosRelacionados = ({ productoId }) => {  // Acepta productoId como prop
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favoritos } = useFavoritos();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos();
  }, [favoritos, productoId]);  // Añade productoId como dependencia

  const fetchProductos = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(
        `${API_BASE_URL}/api/productos-relacionados/${productoId}`,
        {
          method: 'POST',  // Cambia a GET si el backend lo requiere
          headers: {
            'Content-Type': 'application/json',
          },
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
      console.log("Respuesta de la API:", data);  // Inspecciona la respuesta
  
      // Asegúrate de que `data.productos` sea un array, incluso si está vacío
      setProductos(data.productos || []);
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow pt-32">
        <div className="px-6 pt-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-light text-gray-900 mb-6 text-center animate-fade-in-up">
            Productos Relacionados
          </h1>
          <div className="w-24 h-1 bg-black mb-8 mx-auto animate-slide-up"></div>
        </div>
  
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <p>Cargando productos relacionados...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-16">
            <p className="text-red-500">{error}</p>
          </div>
        ) : !Array.isArray(productos) || productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-16">
            <Search className="w-16 h-16 mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold mb-2">No existen productos relacionados disponibles.</h3>
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
}  

export default ProductosRelacionados;