import React from 'react';
import Navbar from '../components/home/NavBar';
import Slider from '../components/home/Slider';
import InfoSection from '../components/home/InfoSection';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div className="bg-white text-white">
      {/* Navbar */}
      <Navbar />

      {/* Slider con texto superpuesto */}
      <div className="relative">
        <Slider />

        {/* Texto "Muebles RCI" */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-6xl md:text-7xl font-[Museo Sans] font-normal text-yellow-300 mb-4 tracking-wide p-2"
              style={{ textShadow: '6px 6px 12px rgba(0, 0, 0, 0.9)' }}> {/* Sombra más fuerte */}
            Muebles RCI
          </h1>
          <p className="text-3xl md:text-4xl font-[Museo Sans] font-normal text-yellow-300 tracking-wider p-2 rounded-lg"
             style={{ textShadow: '5px 5px 10px rgba(0, 0, 0, 0.8)' }}> {/* Sombra más fuerte */}
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