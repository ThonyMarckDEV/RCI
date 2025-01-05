// ProductoCard.js
import React, { useState } from 'react';
import API_BASE_URL from '../../js/urlHelper';

const ProductoCard = ({ producto }) => {
  const [modeloSeleccionado, setModeloSeleccionado] = useState(0);
  const [fade, setFade] = useState(false);

  const modeloActual = producto.modelos[modeloSeleccionado];
  const imagenActual =
    (Array.isArray(modeloActual.imagenes) && modeloActual.imagenes[0]?.urlImagen) ||
    '/placeholder.jpg';

  const handleModeloChange = (index) => {
    setFade(true); // Activar el fade-out
    setTimeout(() => {
      setModeloSeleccionado(index);
      setFade(false); // Desactivar el fade-out
    }, 300); // Duración de la animación
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105">
       {/* Imagen del producto con animación de fade */}
      <div className="h-56 bg-gray-100 relative overflow-hidden">
            <img
              src={`${API_BASE_URL}/storage/${imagenActual}`}
              alt={modeloActual.nombreModelo}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                fade ? 'opacity-0' : 'opacity-100'
              }`}
            />
      </div>


      {/* Contenido del producto */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{producto.nombreProducto}</h3>
        <p className="text-sm text-gray-600 mb-4">{producto.descripcion}</p>

        {/* Selector de modelos */}
        <div className="flex gap-2 mb-4">
          {Array.isArray(producto.modelos) &&
            producto.modelos.map((modelo, index) => (
              <button
                key={modelo.idModelo}
                onClick={() => handleModeloChange(index)}
                className={`px-3 py-1 text-sm rounded-full ${
                  modeloSeleccionado === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {modelo.nombreModelo}
              </button>
            ))}
        </div>

        {/* Categoría */}
        <p className="text-sm text-gray-500">
          Categoría: {producto.nombreCategoria}
        </p>
      </div>
    </div>
  );
};

export default ProductoCard;