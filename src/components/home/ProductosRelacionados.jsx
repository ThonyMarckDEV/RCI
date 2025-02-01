import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import API_BASE_URL from '../../js/urlHelper';

const ProductosRelacionados = ({ productoId }) => {
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProductosRelacionados = async () => {
      try {
        setLoading(true);
        // Verifica que el productoId esté presente antes de hacer la solicitud
        if (!productoId) {
          console.error("El productoId no está disponible.");
          return;
        }
    
        const response = await fetch(
          `${API_BASE_URL}/api/productos-relacionados/${productoId}`
        );
        console.log(await response.json());  // Log the actual response from the API
        if (!response.ok) throw new Error('Error al obtener productos relacionados');
        const data = await response.json();
        setProductosRelacionados(data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductosRelacionados();
}, [productoId]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productosRelacionados.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === productosRelacionados.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Productos Relacionados</h2>
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {productosRelacionados.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 px-2">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="mt-2 text-center font-semibold">{item.nombre}</p>
                </div>
              ))}
            </div>
          </div>
          {productosRelacionados.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/80 text-white rounded-full"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/80 text-white rounded-full"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductosRelacionados;