import React from 'react';
import Navbar from '../components/home/NavBar';
import Slider from '../components/home/Slider';
import InfoSection from '../components/home/InfoSection';
import Footer from '../components/home/Footer';
import Categorias from '../components/home/Categorias'; // Importa el componente Categorias

const Home = () => {
  return (
    <div className="bg-white text-white">
      {/* Navbar */}
      <Navbar />
  
      {/* Slider con texto superpuesto */}
      <div className="relative">
        <Slider />
  
        {/* Texto "Muebles RCI" */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <h1
            className="text-6xl md:text-7xl font-[Museo Sans] font-normal text-yellow-300 mb-4 tracking-wide p-2 opacity-0 animate-slide-down"
            style={{ 
              textShadow: '6px 6px 12px rgba(0, 0, 0, 0.9)', 
              animationDelay: '0.5s' 
            }}
          >
            Muebles RCI
          </h1>
          <p
            className="text-3xl md:text-4xl font-[Museo Sans] font-normal text-yellow-300 tracking-wider p-2 rounded-lg opacity-0 animate-fade-in-up"
            style={{ 
              textShadow: '5px 5px 10px rgba(0, 0, 0, 0.8)', 
              animationDelay: '1s' 
            }}
          >
            Calidad sin límites a cómodos precios
          </p>
  
          {/* Botón de llamado a la acción */}
          <button
            className="mt-8 bg-yellow-500 text-white text-xl font-semibold py-3 px-8 rounded-lg opacity-0 animate-fade-in-up hover:bg-yellow-600 transition duration-300"
            style={{ animationDelay: '1.5s' }}
          >
            <a href='/catalogo'>¡Empecemos!</a>
          </button>
        </div>
      </div>
  
      {/* Sección de información */}
      <InfoSection />
  
      {/* Título de Categorías */}
      <h1 className="text-4xl text-center my-8 text-black">Categorías</h1>
  
      {/* Componente Categorías */}
      <Categorias />
  
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;