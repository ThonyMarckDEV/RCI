import React, { useState } from 'react';
import API_BASE_URL from '../../js/urlHelper';
import DetalleProducto from './DetalleProducto';

const ProductoCard = ({ producto }) => {
  const [modeloSeleccionado, setModeloSeleccionado] = useState(0);
  const [fade, setFade] = useState(false);
  const [showDetalle, setShowDetalle] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);

  // Validación de producto y modelos
  const modelos = producto?.modelos || [];
  const modeloActual = modelos[modeloSeleccionado] || {};
  const imagenes = Array.isArray(modeloActual.imagenes) ? modeloActual.imagenes : [];
  const imagenUrl = imagenes[imagenActual]?.urlImagen || '/placeholder.jpg';

  const handleModeloChange = (index) => {
    setFade(true);
    setTimeout(() => {
      setModeloSeleccionado(index);
      setImagenActual(0); // Resetear la imagen actual al cambiar de modelo
      setFade(false);
    }, 300);
  };

  const handleImageChange = (index) => {
    setFade(true);
    setTimeout(() => {
      setImagenActual(index);
      setFade(false);
    }, 300);
  };

  return (
    <>
      <div
        className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 cursor-pointer"
        onClick={() => setShowDetalle(true)}
      >
        {/* Imagen del producto con animación de fade */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={`${API_BASE_URL}/storage/${imagenUrl}`}
            alt={modeloActual.nombreModelo}
            className={`w-full h-full object-cover absolute inset-0 transition-all duration-300 ${
              fade ? 'opacity-0' : 'opacity-100'
            } group-hover:scale-105`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Indicadores de imagen con fondo negro transparente */}
          {imagenes.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 p-2 bg-black/50 rounded-full"
              onClick={(e) => e.stopPropagation()} // Evita que el clic abra el detalle
            >
              {imagenes.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === imagenActual ? 'bg-yellow-500 w-4' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Contenido del producto */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
            {producto.nombreProducto}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {producto.descripcion}
          </p>

          {/* Selector de modelos */}
          <div className="flex flex-wrap gap-2 mb-4" onClick={(e) => e.stopPropagation()}>
            {Array.isArray(producto.modelos) &&
              producto.modelos.map((modelo, index) => (
                <button
                  key={modelo.idModelo}
                  onClick={() => handleModeloChange(index)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                    modeloSeleccionado === index
                      ? 'bg-yellow-500 text-white shadow-md shadow-black-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {modelo.nombreModelo}
                </button>
              ))}
          </div>

          {/* Categoría */}
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
              {producto.nombreCategoria}
            </span>
          </div>
        </div>
      </div>

      {/* Modal de detalle */}
      {showDetalle && (
        <DetalleProducto
          producto={producto}
          onClose={() => setShowDetalle(false)}
          modeloInicial={modeloSeleccionado}
        />
      )}
    </>
  );
};

export default ProductoCard;