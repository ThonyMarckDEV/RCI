import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import { motion } from 'framer-motion';
import laEmpresa from '../img/RCIMAIN.jpeg';

const Clientes = () => {
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
    <div className="bg-white min-h-screen flex flex-col">
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
            Nuestros Clientes
          </motion.h1>
          <div className="w-32 h-1 bg-white mb-8 mx-auto"></div>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
          Colaboraciones que trascienden expectativas
          </p>
        </div>
      </motion.div>

      {/* Brands Slider Section */}
      <div className="w-full bg-gray-50 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="container mx-auto px-6"
        >
          <div className="max-w-7xl mx-auto">
            <Slider {...settings} className="brands-slider">
              {[...Array(20)].map((_, index) => (
                <div key={index} className="px-4 py-6">
                  <div className="bg-white rounded-2xl p-8 h-52 w-full mx-auto flex items-center justify-center transform transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl border border-gray-100">
                    <img
                      src={`/img/marcas/marca${index + 1}.png`}
                      alt={`Cliente ${index + 1}`}
                      className="max-w-[85%] max-h-[85%] object-contain opacity-90 hover:opacity-100 transition-all duration-300"
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
        className="container mx-auto px-6 py-32 bg-white"
      >
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Testimonios de Excelencia
          </h2>
          <div className="w-24 h-1 bg-black mb-8 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[
            {
              text: "La dedicación y maestría de RCI han transformado nuestros espacios en obras maestras del diseño y la funcionalidad.",
              author: "María González",
              company: "Diseño Interior SA",
              role: "Directora Creativa"
            },
            {
              text: "Su compromiso con la excelencia y la innovación establece nuevos estándares en la industria del mobiliario.",
              author: "Carlos Rodríguez",
              company: "Arquitectos Asociados",
              role: "Socio Principal"
            },
            {
              text: "La fusión perfecta entre artesanía tradicional y visión contemporánea. RCI supera consistentemente nuestras expectativas.",
              author: "Ana López",
              company: "Constructora del Norte",
              role: "Gerente de Proyectos"
            }
          ].map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="mb-8">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-8 text-lg leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t border-gray-100 pt-6">
                <p className="font-medium text-gray-900 text-lg">{testimonial.author}</p>
                <p className="text-yellow-500 font-medium mt-1">{testimonial.role}</p>
                <p className="text-gray-500 text-sm mt-1">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />

      <style jsx global>{`
        .brands-slider .slick-track {
          display: flex;
          align-items: center;
        }
        .brands-slider .slick-slide > div {
          margin: 0 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Clientes;