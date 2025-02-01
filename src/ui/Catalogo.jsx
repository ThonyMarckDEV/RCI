import React, { useState, useEffect } from 'react';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import Filtrador from '../components/home/Filtrador';
import ProductosCatalogo from '../components/home/ProductosCatalogo';
import CatalogoSearch from '../components/home/CatalogoSearch';
import API_BASE_URL from '../js/urlHelper';
import { motion } from 'framer-motion';
import productos from '../img/productos.webp';

const Catalogo = () => {
  const [filtros, setFiltros] = useState({
    nombre: '',
    categoria: ''
  });
  const [categorias, setCategorias] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/listarCategoriasFiltrador`);
        if (!response.ok) {
          throw new Error('Error al cargar las categorías');
        }
        const data = await response.json();
        setCategorias(data.data || []);
      } catch (error) {
        console.error('Error fetching categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFiltros(prev => ({ ...prev, nombre: term }));
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };  

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-light text-gray-800">
      {/* Navbar - fixed position */}
      <Navbar className="fixed top-0 w-full z-50" />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Overlay oscuro para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Imagen de fondo */}
        <img
          src={productos} // Reemplaza con la ruta de tu imagen
          alt="Fondo de contacto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Contenido del Hero Section */}
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8"
          >
            Productos
          </motion.h1>
          <div className="w-32 h-1 bg-white mb-8 mx-auto"></div>
        </div>
      </motion.div>

      {/* Filtrador - justo debajo del navbar */}
      <Filtrador 
        onFilterApply={setFiltros} 
        categorias={categorias} 
        className="animate-fade-in"
      />

      {/* Content wrapper */}
      <div className="pt-[88px]"> {/* Ajustado al alto exacto del navbar */}
        {/* Main content */}
        <main className="flex-grow pb-16 relative">
          {/* Title section */}
          <div className="px-6 mt-8">
            <div className="px-6 pt-8">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-light text-gray-900 mb-6 text-center animate-fade-in-up">
                Busca tus Productos
              </h1>
              <div className="w-24 h-1 bg-black mb-8 mx-auto animate-slide-up"></div>
            </div>
            {/* Search section */}
            <CatalogoSearch 
              onSearch={handleSearch} 
              onSort={handleSort}
            />
          </div>

          {/* Products section */}
          <div className="px-6">
            <ProductosCatalogo 
              filtros={{ ...filtros, sortOrder }} 
              className="animate-slide-down"
            />
          </div>
        </main>
      </div>

      {/* Footer - con margen superior para separarlo del contenido */}
      <div className="mt-100"> {/* Añade un margen superior de 4rem (mt-16) */}
        <Footer className="animate-slide-up" />
      </div>
    </div>
  );
};

export default Catalogo;