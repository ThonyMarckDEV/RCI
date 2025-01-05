import React, { useState } from 'react';

const Filtrador = ({ onFilterApply, categorias }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleApplyFilter = () => {
    onFilterApply({ nombre, categoria });
  };

  const handleResetFilter = () => {
    setNombre('');
    setCategoria('');
    onFilterApply({ nombre: '', categoria: '' });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Filtrar Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          Reiniciar Filtros
        </button>
        <button
          onClick={handleApplyFilter}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default Filtrador;