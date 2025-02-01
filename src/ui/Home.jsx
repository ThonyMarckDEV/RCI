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
  
      
      {/* Sección de información */}
      <InfoSection />
  
      {/* Título de Categorías */}
      <h1 className="text-4xl text-center my-8 text-black">Categorías</h1>
  
      {/* Componente Categorías */}
      <Categorias />
  
      {/* Footer */}
      <Footer />
      </div>
    </div>
  );
};

export default Home;