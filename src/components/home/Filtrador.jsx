import React, { useState } from 'react';
import { AiOutlineFilter } from 'react-icons/ai';

const Filtrador = ({ onFilterApply, categorias }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  const handleApplyFilter = () => {
    onFilterApply({ nombre, categoria });
    setMostrarFiltro(false); // Oculta el filtrador al aplicar
  };

  const handleResetFilter = () => {
    setNombre('');
    setCategoria('');
    onFilterApply({ nombre: '', categoria: '' });
    setMostrarFiltro(false);
  };

  const toggleFiltro = () => {
    setMostrarFiltro(!mostrarFiltro);
  };

  return (
    <div>
      {/* Filtro deslizable */}
      <div
        className={`fixed top-0 right-0 h-full w-80 shadow-lg transform ${
          mostrarFiltro ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 lg:relative lg:translate-x-0 lg:block lg:w-full lg:h-auto z-40 ${
          mostrarFiltro ? 'bg-white' : 'bg-gray-100'
        }`}
      >
        <div className="p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Filtrar Productos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Filtro por nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Buscar por nombre"
              />
            </div>
  
            {/* Filtro por categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las categorías</option>
                {categorias.map((cat) => (
                  <option key={cat.idCategoria} value={cat.idCategoria}>
                    {cat.nombreCategoria}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Botones de aplicar y reiniciar filtros */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleResetFilter}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Reiniciar
            </button>
            <button
              onClick={handleApplyFilter}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
  
      {/* Botón flotante para mostrar el filtrador en móvil */}
      <button
        onClick={toggleFiltro}
        className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-xl lg:hidden"
      >
        <AiOutlineFilter className="text-2xl" />
      </button>
  
      {/* Fondo oscuro cuando el filtro está abierto en móvil */}
      {mostrarFiltro && (
        <div
          onClick={() => setMostrarFiltro(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default Filtrador;
