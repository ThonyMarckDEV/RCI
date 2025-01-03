import React from 'react';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import laEmpresa from '../img/RCIMAIN.jpeg';

const LaEmpresa = () => {
  return (
    <div className="bg-white font-light text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="container mx-auto px-6 py-20">
        {/* Título */}
        <div className="text-center mb-16 animate__animated animate__fadeIn animate__delay-1s">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 mb-4 tracking-wide transform hover:scale-105 transition-transform duration-500">
            La Empresa
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 italic">
            Conoce nuestra historia y lo que nos hace diferentes.
          </p>
        </div>

        {/* Foto de la empresa */}
        <div className="flex justify-center mb-16 animate__animated animate__fadeIn animate__delay-2s">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
            {/* Borde difuminado */}
            <div className="absolute inset-0 rounded-full border-4 border-yellow-500/30 blur-sm"></div>
            {/* Imagen */}
            <img
              src={laEmpresa} // Cambia esto por la ruta de tu imagen
              alt="Foto de la empresa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Historia */}
        <div className="space-y-8 mb-16 animate__animated animate__fadeIn animate__delay-2s">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-yellow-500 pb-2">
            Los inicios de RCI
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Los inicios de la empresa RCI, se remontan a 1980. La primera actividad era la decoración del hogar, representada por adornos de estilo colonial. Después de quince años, el negocio creció y se fortaleció, decidiendo ampliar la línea con la creación de la fábrica de muebles, ahora manejada como una empresa familiar de manera profesional.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            En el año 2007, se abrió un nuevo giro de negocio: RCI Cabinas. Fabricando cabinas amobladas para su venta y alquiler a empresas petroleras y mineras, aplicando todo el know-how adquirido con los clientes internacionales.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Hoy en día, RCI amuebla oficinas, hoteles, hogares y campamentos, liderando el sector con procesos que cumplen normas internacionales de calidad y seguridad.
          </p>
        </div>

        {/* Ventajas con contenedores individuales y diseño lujoso */}
        <div className="flex flex-wrap justify-center gap-12 animate__animated animate__fadeIn animate__delay-3s">
          {[
            "Dos años de garantía",
            "Asesoría especializada",
            "Servicio de entrega gratuita",
            "Instalación gratuita",
            "Calidad en acabados",
            "Tiempo de entrega establecidos",
          ].map((ventaja, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-2xl w-80 transform hover:scale-105 transition-transform duration-500 hover:shadow-3xl relative overflow-hidden"
            >
              {/* Fondo decorativo */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-10 hover:opacity-20 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Número de la ventaja */}
              <div className="w-20 h-20 flex items-center justify-center bg-yellow-500 rounded-full text-white text-4xl font-bold relative z-10 shadow-lg mb-6">
                {index + 1}
              </div>

              {/* Texto de la ventaja */}
              <h4 className="text-2xl font-semibold text-gray-800 relative z-10 mb-4 text-center">
                {ventaja}
              </h4>
              
              {/* Línea decorativa */}
              <div className="w-24 h-1 bg-yellow-500 mb-4 relative z-10"></div>
              
              <p className="text-lg text-gray-600 text-center relative z-10">
                Ofrecemos {ventaja.toLowerCase()} para todos nuestros clientes.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LaEmpresa;