import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import { motion } from 'framer-motion';

// Animaciones
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const Clientes = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // No mostrar flechas
    dots: false, // No mostrar puntos
    centerMode: true,
    focusOnSelect: true,
    centerPadding: '0',
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

  return (
    <div className="bg-white font-light text-gray-800 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Contenedor para centrar el contenido, ajustado para dispositivos móviles */}
      <div className="flex flex-1 items-center justify-center py-16 mt-16 sm:mt-0">
        <div className="w-full max-w-7xl px-6">
          {/* Título con línea de separación */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-semibold text-yellow-500 mb-4">
              Nuestros Clientes
            </h2>
            {/* Línea de separación amarilla */}
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </motion.div>

          {/* Slider de Marcas */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative"
          >
            <Slider {...settings}>
              {['marca1.png', 'marca2.png', 'marca3.png', 'marca4.png', 'marca5.png'].map((marca, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center p-4 w-full"
                >
                  <motion.div className="w-full h-40 bg-white rounded-lg shadow-lg border border-gray-300 flex items-center justify-center">
                    <motion.img
                      src={`/img/marcas/${marca}`} // Usando la ruta relativa en public/img/marcas
                      alt={`Marca ${index + 1}`}
                      className="w-3/4 h-3/4 object-contain transition-transform transform hover:scale-110 duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    />
                  </motion.div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Clientes;