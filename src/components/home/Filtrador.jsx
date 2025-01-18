import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Filtrador = ({ categorias = [] }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const filtradorRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const nombreParam = queryParams.get('nombre');
    const categoriaParam = queryParams.get('categoria');

    if (nombreParam) setNombre(nombreParam);
    if (categoriaParam) setCategoria(categoriaParam);
  }, [location.search]);

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    if (nombre) params.set('nombre', nombre);
    if (categoria) params.set('categoria', categoria);
    navigate(`/catalogo?${params.toString()}`);

    // Cerrar el filtro automáticamente en dispositivos móviles
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const handleResetFilter = () => {
    setNombre('');
    setCategoria('');
    navigate('/catalogo');

    // Cerrar el filtro automáticamente en dispositivos móviles
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const FilterContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Filtros</h2>
          <button
            onClick={toggleFilter}
            className="p-2 text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Nombre filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Buscar por nombre"
            />
          </div>

          {/* Category filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              <option value="">Todas las categorías</option>
              {Array.isArray(categorias) && categorias.map((cat) => (
                <option key={cat.idCategoria} value={cat.nombreCategoria}>
                  {cat.nombreCategoria}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleApplyFilter}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-sm"
          >
            Aplicar Filtros
          </button>
          <button
            onClick={handleResetFilter}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop slideable sidebar */}
      <aside
        ref={filtradorRef}
        className={`fixed top-20 h-[calc(100vh-5rem)] w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <FilterContent />
        {/* Desktop toggle button */}
        <button
          onClick={toggleFilter}
          className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 transition-colors"
        >
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </aside>

      {/* Floating button */}
      <button
        onClick={toggleFilter}
        className="fixed bottom-8 right-8 z-50 p-4 bg-yellow-500 text-white rounded-full shadow-xl hover:bg-yellow-600 transition-colors"
      >
        <Filter size={24} />
      </button>
    </>
  );
};

export default Filtrador;