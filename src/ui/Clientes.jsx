import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import { motion } from 'framer-motion';

const Clientes = () => {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    centerMode: true,
    centerPadding: '60px',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
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
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-6 pt-32 pb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
          Nuestros Clientes
        </h1>
         {/* Línea amarilla */}
         <div className="w-50 h-1 bg-yellow-500 mb-8 mx-auto md:mx-0 animate-fade-in-up animate-delay-300"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
          Empresas líderes que confían en nuestra calidad y servicio
        </p>
      </motion.div>

      {/* Brands Slider Section */}
      <div className="w-full bg-gray-50 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="container mx-auto px-6"
        >
          <Slider {...settings} className="brands-slider">
            {[...Array(20)].map((_, index) => (
              <div key={index} className="px-4">
                <div className="bg-white rounded-lg p-8 h-48 flex items-center justify-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <img
                    src={`/img/marcas/marca${index + 1}.png`}
                    alt={`Cliente ${index + 1}`}
                    className="max-w-[80%] max-h-[80%] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-6 py-24"
      >
        <h2 className="text-3xl font-light text-gray-900 text-center mb-16">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
              <div className="border-t pt-4">
                <p className="font-medium text-gray-900">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <Footer />

      {/* Custom styles for slider dots */}
      <style jsx global>{`
        .brands-slider .slick-dots {
          bottom: -3rem;
        }
        .brands-slider .slick-dots li button:before {
          font-size: 8px;
          color: #gray-300;
        }
        .brands-slider .slick-dots li.slick-active button:before {
          color: #gray-900;
        }
      `}</style>
    </div>
  );
};

export default Clientes;