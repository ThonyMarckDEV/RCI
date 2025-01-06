import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../js/urlHelper';
import { FaWifi } from 'react-icons/fa'; // Ícono para error de conexión
import { Link } from 'react-router-dom'; // Importar Link para redirección

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 6,
    total: 0,
    lastPage: 1,
  });

  useEffect(() => {
    fetchCategories();
  }, [pagination.page, pagination.perPage]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/listarCategorias?page=${pagination.page}&perPage=${pagination.perPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al cargar las categorías');
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        setCategories(data.data);
        setPagination({
          ...pagination,
          total: data.pagination.total,
          lastPage: data.pagination.lastPage,
        });
      } else {
        throw new Error('La respuesta de la API no es válida');
      }
    } catch (err) {
      setError('Error de conexión con el servidor'); // Guardar el mensaje de error
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
    // Desplazar la página al principio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-yellow-300 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 py-16">
        <FaWifi className="text-6xl mb-4" /> {/* Ícono de WiFi sin señal */}
        <p className="text-xl font-semibold">
          Error de conexión con el servidor
        </p>
        <p className="text-gray-400">
          Por favor, verifica tu conexión a internet e intenta nuevamente.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Grid de categorías - 3 arriba y 3 abajo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Primer grupo de 3 categorías */}
        {categories.slice(0, 3).map((category) => (
          <Link
            key={category.idCategoria}
            to={`/catalogo?categoria=${encodeURIComponent(category.nombreCategoria)}`} // Agregar el enlace con el nombre de la categoría
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 overflow-hidden"
          >
            {/* Imagen de la categoría */}
            <div className="h-56 bg-gray-200 relative overflow-hidden rounded-t-2xl">
              <img
                src={`${API_BASE_URL}/storage/${category.imagen}` || '/api/placeholder/400/300'}
                alt={category.nombreCategoria}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/300';
                }}
              />
            </div>

            {/* Contenido de la categoría */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {category.nombreCategoria}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">{category.descripcion}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Segundo grupo de 3 categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.slice(3, 6).map((category) => (
          <Link
            key={category.idCategoria}
            to={`/catalogo?categoria=${encodeURIComponent(category.nombreCategoria)}`} // Agregar el enlace con el nombre de la categoría
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 overflow-hidden"
          >
            {/* Imagen de la categoría */}
            <div className="h-56 bg-gray-200 relative overflow-hidden rounded-t-2xl">
              <img
                src={`${API_BASE_URL}/storage/${category.imagen}` || '/api/placeholder/400/300'}
                alt={category.nombreCategoria}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/300';
                }}
              />
            </div>

            {/* Contenido de la categoría */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {category.nombreCategoria}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">{category.descripcion}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-8">
        <nav className="inline-flex rounded-lg shadow-sm">
          {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-6 py-3 border-2 rounded-lg mx-1 ${
                pagination.page === page
                  ? 'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              } transition-all duration-300`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoriesGrid;