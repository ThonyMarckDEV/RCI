import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer'; // Importar hook
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

  // Hook para detectar si el título está en la vista
  const { ref, inView } = useInView({
    triggerOnce: true, // Solo se activa una vez
    threshold: 0.5, // Porcentaje de visibilidad para activar
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
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
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
    <div
      className="w-full p-6 space-y-12 bg-cover bg-center"
      style={{
        backgroundImage: 'url(/img/fondocatgorias.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Título con animación de aparecimiento */}
      <div
        ref={ref}
        className={`text-center transition-all duration-1000 ease-in-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-5xl font-light font-serif text-white mb-4">
          Nuestras Categorías
        </h2>
        <p className="text-lg text-white">
          Explora nuestras categorías y descubre lo mejor para ti.
        </p>
      </div>

      {/* Slider para móviles y desktop */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full relative"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.idCategoria}>
            <Link
              to={`/catalogo?categoria=${encodeURIComponent(category.nombreCategoria)}`}
              className="block h-[600px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out overflow-hidden group relative"
            >
              <div className="h-full bg-gray-200 relative overflow-hidden rounded-2xl group">
                {/* Overlay: Siempre visible */}
                <div className="absolute inset-0 bg-black bg-opacity-25 z-10"></div>

                {/* Imagen que se agranda en hover */}
                <img
                  src={`${API_BASE_URL}/storage/${category.imagen}` || '/api/placeholder/400/300'}
                  alt={category.nombreCategoria}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/300';
                  }}
                />
              </div>

              {/* Título y descripción superpuestos en la imagen */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10">
                <p className="text-3xl font-light font-serif text-white drop-shadow-lg">
                  {category.nombreCategoria}
                </p>
                <p className="text-sm text-white lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                  {category.descripcion}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* Flechas de navegación personalizadas (fuera de la imagen) */}
        <div className="swiper-button-next text-black p-4 rounded-full shadow-lg transition-all duration-300"></div>
        <div className="swiper-button-prev text-black p-4 rounded-full shadow-lg transition-all duration-300"></div>

        {/* Indicadores de paginación personalizados (negros) */}
        <div className="swiper-pagination !bottom-0 !relative mt-6"></div>
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
                  ? 'bg-black text-white border-black hover:bg-gray-800'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              } transition-all duration-300`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>

      {/* Estilos personalizados para los bullets */}
      <style>
        {`
          .swiper-pagination-bullet {
            background-color: black;
            opacity: 0.5;
            width: 10px;
            height: 10px;
            margin: 0 6px !important;
          }
          .swiper-pagination-bullet-active {
            background-color: black;
            opacity: 1;
          }
          .swiper-button-next {
            color: white;
          }

          .swiper-button-prev {
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default CategoriesGrid;