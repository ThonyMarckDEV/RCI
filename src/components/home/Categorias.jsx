import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../js/urlHelper';

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/listarCategorias`,
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

      if (Array.isArray(data)) {
        setCategories(data);
      } else if (Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        throw new Error('La respuesta de la API no es válida');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.idCategoria}
            className="bg-white rounded-lg shadow-md overflow-hidden 
                     transform transition-all duration-300 ease-in-out
                     hover:scale-105 hover:shadow-xl"
          >
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img
                src={`${API_BASE_URL}/storage/${category.imagen}` || '/api/placeholder/400/300'}
                alt={category.nombreCategoria}
                className="w-full h-full object-cover 
                         transform transition-transform duration-300 ease-in-out
                         hover:scale-110"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/300';
                }}
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {category.nombreCategoria}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {category.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;