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
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-6 pt-32 pb-24 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
          La Empresa
        </h1>
          {/* Línea amarilla */}
          <div className="w-50 h-1 bg-yellow-500 mb-8 mx-auto md:mx-0 animate-fade-in-up animate-delay-300"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Construyendo calidad y confort desde 1980
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full bg-gray-50 py-24"
      >
        <div className="container mx-auto px-6">
          <div className="relative max-w-4xl mx-auto h-[60vh] rounded-lg overflow-hidden">
            <img
              src={laEmpresa}
              alt="RCI Empresa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* History Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-6 py-24"
      >
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-8">Los inicios de RCI</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Los inicios de la empresa RCI se remontan a 1980. La primera actividad era la decoración del hogar, representada por adornos de estilo colonial. Después de quince años, el negocio creció y se fortaleció, decidiendo ampliar la línea con la creación de la fábrica de muebles, ahora manejada como una empresa familiar de manera profesional.
              </p>
              <p>
                En el año 2007, se abrió un nuevo giro de negocio: RCI Cabinas. Fabricando cabinas amobladas para su venta y alquiler a empresas petroleras y mineras, aplicando todo el know-how adquirido con los clientes internacionales.
              </p>
              <p>
                Hoy en día, RCI amuebla oficinas, hoteles, hogares y campamentos, liderando el sector con procesos que cumplen normas internacionales de calidad y seguridad.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Advantages Section */}
      <div className="w-full bg-gray-50 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="container mx-auto px-6"
        >
          <h2 className="text-3xl font-light text-gray-900 text-center mb-16">
            Nuestras Ventajas
          </h2>
            {/* Línea amarilla */}
            <div className="w-50 h-1 bg-yellow-500 mb-8 mx-auto md:mx-0 animate-fade-in-up animate-delay-300"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              "Dos años de garantía",
              "Asesoría especializada",
              "Servicio de entrega gratuita",
              "Instalación gratuita",
              "Calidad en acabados",
              "Tiempo de entrega establecidos",
            ].map((ventaja, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl font-light text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-grow bg-gray-200"></div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  {ventaja}
                </h3>
                <p className="text-gray-600">
                  Comprometidos con ofrecer {ventaja.toLowerCase()} para asegurar tu satisfacción.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Values Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-6 py-24"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            Nuestro Compromiso
          </h2>
          <p className="text-gray-600 leading-relaxed">
            En RCI, nos dedicamos a crear espacios que inspiran. Cada pieza que fabricamos es testimonio de nuestro compromiso con la excelencia, la innovación y la satisfacción del cliente.
          </p>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default LaEmpresa;