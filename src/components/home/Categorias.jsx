import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../js/urlHelper';
import { FaWifi } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
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
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === Math.ceil(categories.length / 3) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(categories.length / 3) - 1 : prev - 1
    );
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
        <FaWifi className="text-6xl mb-4" />
        <p className="text-xl font-semibold">
          Error de conexión con el servidor
        </p>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      {/* Título elegante */}
      <div className="container relative z-10 mx-auto px-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light text-black mb-8"
        >
          Categorias
        </motion.h1>
        <div className="w-32 h-1 bg-black mb-8 mx-auto"></div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden lg:grid grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.idCategoria}
            to={`/catalogo?categoria=${encodeURIComponent(category.nombreCategoria)}`}
            className="group relative h-[600px] overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl"
          >
            {/* Image Container */}
            <div className="absolute inset-0">
              <img
                src={`${API_BASE_URL}/storage/${category.imagen}` || '/api/placeholder/400/600'}
                alt={category.nombreCategoria}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/600';
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="absolute bottom-0 p-8 w-full">
              <h3 className="font-serif text-3xl text-white mb-4 transform transition-all duration-500 group-hover:translate-y-[-8px]">
                {category.nombreCategoria}
              </h3>
              <p className="text-white/80 text-lg leading-relaxed opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                {category.descripcion}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile/Tablet Slider */}
      <div className="lg:hidden relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {categories.map((category) => (
              <div key={category.idCategoria} className="w-full flex-shrink-0 px-4">
                <Link
                  to={`/catalogo?categoria=${encodeURIComponent(category.nombreCategoria)}`}
                  className="block relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src={`${API_BASE_URL}/storage/${category.imagen}` || '/api/placeholder/400/500'}
                    alt={category.nombreCategoria}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/500';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 p-6 w-full">
                    <h3 className="font-serif text-2xl text-white mb-3">
                      {category.nombreCategoria}
                    </h3>
                    <p className="text-white/80 text-base leading-relaxed">
                      {category.descripcion}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/80 p-3 rounded-full shadow-lg hover:bg-black transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/80 p-3 rounded-full shadow-lg hover:bg-black transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(categories.length / 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-black w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesGrid;