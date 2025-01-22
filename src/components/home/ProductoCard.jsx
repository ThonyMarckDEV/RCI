import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Heart } from 'lucide-react';
import API_BASE_URL from '../../js/urlHelper';
import DetalleProducto from './DetalleProducto';

const ProductoCard = ({ producto }) => {
  const [modeloSeleccionado, setModeloSeleccionado] = useState(0);
  const [fade, setFade] = useState(false);
  const [showDetalle, setShowDetalle] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const modelos = producto?.modelos || [];
  const modeloActual = modelos[modeloSeleccionado] || {};
  const imagenes = Array.isArray(modeloActual.imagenes) ? modeloActual.imagenes : [];
  const imagenUrl = imagenes[imagenActual]?.urlImagen || '/placeholder.jpg';

  const handleModeloChange = (index) => {
    setFade(true);
    setTimeout(() => {
      setModeloSeleccionado(index);
      setImagenActual(0);
      setFade(false);
    }, 300);
  };

  const handleImageChange = (direction) => {
    setFade(true);
    setTimeout(() => {
      if (direction === 'next') {
        setImagenActual((prev) => (prev + 1) % imagenes.length);
      } else {
        setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
      }
      setFade(false);
    }, 300);
  };

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de categoría */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 text-xs font-medium bg-black/80 text-white rounded-full backdrop-blur-sm">
          {producto.nombreCategoria}
        </span>
      </div>

      {/* Botón de favoritos */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 shadow-lg transition-all duration-300 hover:scale-110"
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
        />
      </button>

      {/* Contenedor de imagen principal */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setShowDetalle(true)}
        >
          <img
            src={`${API_BASE_URL}/storage/${imagenUrl}`}
            alt={modeloActual.nombreModelo}
            className={`w-full h-full object-cover transition-all duration-700 ${
              fade ? 'opacity-0' : 'opacity-100'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          {/* Overlay gradiente mejorado */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Navegación de imágenes mejorada */}
        {imagenes.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleImageChange('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleImageChange('next');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Indicador de imágenes mejorado */}
        {imagenes.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {imagenes.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === imagenActual ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contenido mejorado */}
      <div className="p-6 space-y-4">
        {/* Nombre del producto */}
        <h3 className="text-2xl font-light text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
          {producto.nombreProducto}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 line-clamp-2 font-light leading-relaxed">
          {producto.descripcion}
        </p>

        {/* Modelos */}
        <div className="flex flex-wrap gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
          {Array.isArray(producto.modelos) &&
            producto.modelos.map((modelo, index) => (
              <button
                key={modelo.idModelo}
                onClick={() => handleModeloChange(index)}
                className={`px-5 py-2 text-sm font-medium transition-all duration-300 border-2 rounded-full ${
                  modeloSeleccionado === index
                    ? 'border-yellow-500 text-yellow-500 bg-yellow-50'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {modelo.nombreModelo}
              </button>
            ))}
        </div>

        {/* Botón de detalles */}
        <button
          onClick={() => setShowDetalle(true)}
          className="w-full mt-4 py-3 bg-yellow-500 text-white font-medium transition-all duration-300 hover:bg-yellow-600 rounded-lg flex items-center justify-center space-x-2 group/btn"
        >
          <span>Ver detalles</span>
          <Plus className="w-5 h-5 transition-transform group-hover/btn:rotate-90" />
        </button>
      </div>

      {showDetalle && (
        <DetalleProducto
          producto={producto}
          onClose={() => setShowDetalle(false)}
          modeloInicial={modeloSeleccionado}
        />
      )}
    </div>
  );
};

export default ProductoCard;