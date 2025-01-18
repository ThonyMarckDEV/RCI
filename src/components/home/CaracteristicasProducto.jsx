import React, { useState } from 'react';

const CaracteristicasProducto = ({ caracteristicas }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Si no hay características, no mostrar nada
  if (!caracteristicas || Object.keys(caracteristicas).length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4">
          {/* Título y botón "Ver más" */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Características del producto</h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </button>
          </div>

          {/* Contenedor de características */}
          <div className="bg-white rounded-xl p-6 relative overflow-hidden">
            <div
              className={`text-gray-600 whitespace-pre-wrap ${
                !isExpanded ? "max-h-32 overflow-hidden" : "max-h-none"
              } transition-all duration-300 ease-in-out`}
            >
              {/* Renderizar solo los valores del objeto */}
              <ul>
                {Object.values(caracteristicas).map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
            {Object.keys(caracteristicas).length > 3 && !isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaracteristicasProducto;