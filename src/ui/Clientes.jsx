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
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
          centerMode: false,
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
        <div className="w-full bg-gray-50 py-16 md:py-24 shadow-inner">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="container mx-auto px-4 md:px-6"
          >
            <div className="relative pb-16 md:pb-20"> {/* Added padding bottom container */}
              <Slider {...settings} className="brands-slider">
                {[...Array(20)].map((_, index) => (
                  <div key={index} className="px-2 md:px-4 py-4">
                    <div className="bg-white rounded-xl p-6 md:p-8 h-40 md:h-48 flex items-center justify-center transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                      <img
                        src={`/img/marcas/marca${index + 1}.png`}
                        alt={`Cliente ${index + 1}`}
                        className="max-w-[85%] max-h-[85%] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>

          {/* Estilos para los dots */}
          <style jsx global>{`
            .brands-slider .slick-dots {
              bottom: -3rem !important; /* Increased distance */
              padding-bottom: 1rem;
            }
            .brands-slider .slick-dots li {
              margin: 0 6px;
            }
            .brands-slider .slick-dots li button:before {
              font-size: 8px;
              color: #CBD5E0;
            }
            .brands-slider .slick-dots li.slick-active button:before {
              color: #2D3748;
            }
            @media (max-width: 640px) {
              .brands-slider .slick-dots {
                bottom: -4rem !important; /* Even more space on mobile */
                padding-bottom: 1.5rem;
              }
              .brands-slider .slick-dots li {
                margin: 0 8px; /* Increased spacing between dots on mobile */
              }
            }
          `}</style>
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