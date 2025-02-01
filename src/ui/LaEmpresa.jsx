import React from 'react';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import { motion } from 'framer-motion';
import laEmpresa from '../img/RCIMAIN.jpeg';

const LaEmpresa = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
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
            La Empresa
          </motion.h1>
          <div className="w-32 h-1 bg-white mb-8 mx-auto"></div>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            Creando espacios extraordinarios desde 1980
          </p>
        </div>
      </motion.div>

      {/* History Section - Más elegante */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-6 py-32"
      >
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">Nuestra Historia</h2>
            <div className="w-24 h-1 bg-black mb-12 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={fadeInUp}
              className="space-y-8 text-gray-700 leading-relaxed text-lg"
            >
              <p className="first-letter:text-5xl first-letter:font-light first-letter:text-black first-letter:mr-3 first-letter:float-left">
                Los inicios de la empresa RCI se remontan a 1980, comenzando con la decoración del hogar y adornos de estilo colonial. Tras quince años de crecimiento constante, expandimos nuestro horizonte con la creación de nuestra propia fábrica de muebles, transformándonos en una empresa familiar con visión profesional.
              </p>
              <p>
                En 2007, inauguramos RCI Cabinas, llevando nuestra expertise al sector industrial con soluciones de amueblamiento para empresas petroleras y mineras.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="bg-gray-100 p-8 rounded-xl"
            >
              <div className="relative h-96 overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={laEmpresa}
                  alt="RCI Historia"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Advantages Section - Más sofisticado */}
      <div className="w-full bg-gray-900 py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="container mx-auto px-6"
        >
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
              Excelencia en Cada Detalle
            </h2>
            <div className="w-24 h-1 bg-white mb-8 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              ["Garantía Premium", "Respaldamos cada pieza con dos años de garantía total"],
              ["Asesoría Personalizada", "Expertos dedicados a materializar tu visión"],
              ["Servicio VIP", "Entrega e instalación sin costo adicional"],
              ["Acabados Excepcionales", "Materiales selectos y técnicas artesanales"],
              ["Puntualidad Garantizada", "Compromiso con los tiempos acordados"],
              ["Diseño Exclusivo", "Creaciones únicas adaptadas a tu estilo"],
            ].map(([titulo, descripcion], index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-800 p-10 rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-3xl font-light text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-grow bg-gray-700"></div>
                </div>
                <h3 className="text-2xl font-light text-white mb-4">
                  {titulo}
                </h3>
                <p className="text-gray-400 text-lg">
                  {descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Values Section - Más impactante */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-6 py-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Nuestro Legado de Excelencia
          </h2>
          <div className="w-24 h-1 bg-black mb-12 mx-auto"></div>
          <p className="text-xl text-gray-700 leading-relaxed">
            En RCI, cada creación es una obra maestra que fusiona artesanía tradicional con innovación contemporánea. Nuestro compromiso con la excelencia se refleja en cada detalle, transformando espacios en experiencias extraordinarias que perduran en el tiempo.
          </p>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default LaEmpresa;