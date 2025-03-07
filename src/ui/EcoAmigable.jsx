import React from 'react';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import logoeco from '../img/eco2.png';
import { motion } from 'framer-motion';
import laEmpresa from '../img/RCIMAIN.jpeg';

const EcoAmigable = () => {

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
    <div className="bg-gray-100 font-light text-gray-800">
      {/* Navbar */}
      <Navbar />

      
       {/* Hero Section - Más dramático */}
       <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={laEmpresa}
          alt="RCI Empresa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8"
          >
           Eco Amigable
          </motion.h1>
          <div className="w-32 h-1 bg-white mb-8 mx-auto"></div>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            Trabajamos con madera certificada
          </p>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="container mx-auto px-6 pt-32 pb-24 flex flex-col justify-center items-center"> {/* Added pb-24 for bottom padding */}
        {/* Sección principal */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-12 md:space-y-0 md:space-x-16">
          {/* Logo eco amigable */}
          <div className="flex-shrink-0 mt-12 animate-fade-in-up animate-delay-100">
            <div className="relative w-96 h-96 md:w-120 md:h-120 rounded-full overflow-hidden shadow-2xl border-8 border-white transform hover:scale-105 transition-transform duration-500">
              {/* Borde difuminado */}
              <div className="absolute inset-0 rounded-full border-8 border-yellow-500/20 blur-sm"></div>
              {/* Imagen */}
              <img
                src={logoeco}
                alt="Eco Friendly Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="max-w-2xl space-y-2 text-center md:text-left mt-12">
            {/* Título */}
            <h1 className="text-5xl font-light text-black mb-2 transform hover:scale-105 transition-transform duration-500 inline-block animate-fade-in-up animate-delay-200">
              Eco Amigable
            </h1>
            {/* Línea amarilla */}
            <div className="w-40 h-1 bg-black mb-8 mx-auto md:mx-0 animate-fade-in-up animate-delay-300"></div>

            {/* Descripción */}
            <p className="text-lg text-gray-600 leading-relaxed animate-fade-in-up animate-delay-400">
              RCI es parte del{' '}
              <strong className="text-black font-semibold">
                Sustainable Home Furnishings Council
              </strong>
              , una comunidad global de más de 1,000 fabricantes de mobiliario, tiendas y diseñadores de interiores enfocados en soluciones ecológicas.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed animate-fade-in-up animate-delay-500">
              Nuestra misión es ofrecer mobiliario de alta calidad que combine materiales ecológicos, creando espacios saludables y con menor impacto ambiental. El resultado: hogares modernos, elegantes y responsables con el medio ambiente.
            </p>

            {/* Lista de materiales y procesos */}
            <div className="space-y-6 animate-fade-in-up animate-delay-600">
              <h2 className="text-2xl font-semibold text-gray-800">
                Materiales y procesos ecológicos:
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-600">
                {[
                  "Madera certificada",
                  "Reducción en el consumo de energía",
                  "Optimización del transporte",
                  "Pinturas y acabados con bajo nivel de COV",
                  "Pegamento sin formaldehído",
                  "Materiales reciclados",
                  "Espumas de látex natural",
                  "Textiles orgánicos",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 animate-fade-in-up"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    {/* Ícono de check */}
                    <span className="w-6 h-6 flex items-center justify-center bg-gray-500 text-white rounded-full">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EcoAmigable;