import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../js/urlHelper';
import { FaWifi } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
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
        <p className="text-xl font-semibold">Error de conexión con el servidor</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Slider para móviles y desktop */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.idCategoria}>
            <Link
              to={`/catalogo?categoria=${encodeURIComponent(category.nombreCategoria)}`}
              className="block h-[500px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out overflow-hidden group relative"
            >
              {/* Imagen de la categoría */}
              <div className="h-full bg-gray-200 relative overflow-hidden rounded-t-2xl">
                <img
                  src={`${API_BASE_URL}/storage/${category.imagen}` || '/api/placeholder/400/300'}
                  alt={category.nombreCategoria}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/300';
                  }}
                />
              </div>

              {/* Descripción (visible en móvil por defecto y en desktop al hacer hover) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white bg-opacity-90 lg:bg-opacity-0 lg:group-hover:bg-opacity-90 transition-all duration-300">
                <p className="text-sm text-gray-700 lg:text-white lg:group-hover:text-gray-700 line-clamp-3">
                  {category.descripcion}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

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