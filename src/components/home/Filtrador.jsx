import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Filter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importamos useLocation para leer la URL

const Filtrador = ({ categorias = [] }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const filtradorRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para leer la URL

  // Leer los parámetros de la URL al cargar el componente
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const nombreParam = queryParams.get('nombre');
    const categoriaParam = queryParams.get('categoria');

    if (nombreParam) setNombre(nombreParam);
    if (categoriaParam) setCategoria(categoriaParam);
  }, [location.search]);

  const handleApplyFilter = () => {
    // Construimos la URL con los filtros seleccionados
    const params = new URLSearchParams();
    if (nombre) params.set('nombre', nombre);
    if (categoria) params.set('categoria', categoria);

    // Redirigimos a la URL con los filtros
    navigate(`/catalogo?${params.toString()}`);
  };

  const handleResetFilter = () => {
    setNombre('');
    setCategoria('');
    // Redirigimos a la URL sin filtros
    navigate('/catalogo');
  };

  useEffect(() => {
    const ajustarAlturaFiltrador = () => {
      const navbar = document.querySelector('nav');
      const footer = document.querySelector('footer');

      if (filtradorRef.current && navbar && footer) {
        const navbarHeight = navbar.offsetHeight;
        const footerHeight = footer.offsetHeight;
        const windowHeight = window.innerHeight;
        const alturaDisponible = windowHeight - navbarHeight - footerHeight;
        
        filtradorRef.current.style.height = `${alturaDisponible + 80}px`;
      }
    };

    ajustarAlturaFiltrador();
    window.addEventListener('resize', ajustarAlturaFiltrador);

    return () => {
      window.removeEventListener('resize', ajustarAlturaFiltrador);
    };
  }, []);

  useEffect(() => {
    const panel = mobilePanelRef.current;
    if (panel) {
      if (showMobileFilters) {
        panel.classList.remove('translate-x-full');
        panel.classList.add('translate-x-0');
      } else {
        panel.classList.remove('translate-x-0');
        panel.classList.add('translate-x-full');
      }
    }
  }, [showMobileFilters]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        ref={filtradorRef}
        className="hidden lg:block fixed left-0 top-20 w-80 bg-white"
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-8 text-gray-800">Filtros</h2>
            
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
      </aside>

      {/* Botón flotante para móviles */}
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="lg:hidden fixed bottom-8 right-8 z-50 p-4 bg-yellow-500 text-white rounded-full shadow-xl hover:bg-yellow-700 transition-colors"
      >
        <Filter size={24} />
      </button>

      {/* Mobile filters panel */}
      <div
        ref={mobilePanelRef}
        className="lg:hidden fixed inset-0 bg-white z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out translate-x-full"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Filtros</h2>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Mobile nombre filter */}
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

          {/* Mobile category filter */}
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

        {/* Mobile action buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => {
              handleApplyFilter();
              setShowMobileFilters(false);
            }}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-sm"
          >
            Aplicar Filtros
          </button>
          <button
            onClick={() => {
              handleResetFilter();
              setShowMobileFilters(false);
            }}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </>
  );
};

export default Filtrador;