import React from 'react';
import Navbar from '../components/home/NavBar';
import Slider from '../components/home/Slider'; // Importa el Slider
import InfoSection from '../components/home/InfoSection'; // Importa el nuevo componente
import Footer from '../components/home/Footer'; // Importa el footer

const Home = () => {
  return (
    <div className="bg-white font-light text-white">
      {/* Navbar */}
      <Navbar />

      {/* Slider con texto superpuesto */}
      <div className="relative">
        <Slider />

        {/* Texto "Muebles RCI" */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-extrabold text-yellow-300 mb-4 animate-slide-down tracking-wide [text-shadow:_3px_3px_6px_rgba(0,0,0,0.9)] p-2 animate__animated animate__fadeInDown animate__delay-1s">
            Muebles RCI
          </h1>
          <p className="text-3xl md:text-4xl font-bold text-yellow-300 animate-slide-up tracking-wider [text-shadow:_3px_3px_6px_rgba(0,0,0,0.9)] p-2 rounded-lg animate__animated animate__fadeInUp animate__delay-2s">
            Calidad sin límites a cómodos precios
          </p>
        </div>
      </div>

      {/* Sección de información */}
      <InfoSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
