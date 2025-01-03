import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import { motion } from 'framer-motion';

const Clientes = () => {
  const settings = {
    dots: false, // Elimina los puntos de selección
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Número de slides visibles en PC
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // Oculta las flechas de navegación
    responsive: [
      {
        breakpoint: 1024, // Pantallas medianas (tablets)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Pantallas pequeñas (móviles)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Pantallas muy pequeñas
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
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-16 text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-light text-gray-900 mb-6">
          Nuestros Clientes
        </h1>
        <div className="w-24 h-1 bg-yellow-500 mb-8 mx-auto"></div>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-12 md:mb-16 px-4">
          Empresas líderes que confían en nuestra calidad y servicio
        </p>
      </motion.div>

      {/* Brands Slider Section */}
      <div className="w-full bg-gray-50 py-1 md:py-24 shadow-inner">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="relative pb-16 md:pb-20">
            <Slider {...settings} className="brands-slider">
              {[...Array(20)].map((_, index) => (
                <div key={index} className="px-2 md:px-3 py-4">
                  <div className="bg-white rounded-xl p-4 md:p-6 h-44 md:h-48 w-64 md:w-auto mx-auto mt-10 flex items-center justify-center transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                    <img
                      src={`/img/marcas/marca${index + 1}.png`}
                      alt={`Cliente ${index + 1}`}
                      className="max-w-[80%] max-h-[80%] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-4 md:px-6 py-16 md:py-24"
      >
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-12 md:mb-16">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              text: "La calidad y el servicio superaron nuestras expectativas. Definitivamente volveremos a trabajar juntos.",
              author: "María González",
              company: "Diseño Interior SA"
            },
            {
              text: "Su atención al detalle y profesionalismo hacen que cada proyecto sea excepcional.",
              author: "Carlos Rodríguez",
              company: "Arquitectos Asociados"
            },
            {
              text: "Un equipo comprometido con la excelencia y la satisfacción del cliente.",
              author: "Ana López",
              company: "Constructora del Norte"
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="text-gray-600 italic mb-6 text-base md:text-lg">"{testimonial.text}"</p>
              <div className="border-t pt-4">
                <p className="font-medium text-gray-900">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <Footer />

      <style jsx global>{`
        .brands-slider .slick-dots {
          bottom: -2rem;
        }
        .brands-slider .slick-dots li button:before {
          font-size: 8px;
          color: #CBD5E0;
        }
        .brands-slider .slick-dots li.slick-active button:before {
          color: #2D3748;
        }
      `}</style>
    </div>
  );
};

export default Clientes;