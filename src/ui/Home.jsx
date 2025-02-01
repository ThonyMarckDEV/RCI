import React from 'react';
import Navbar from '../components/home/NavBar';
import Slider from '../components/home/Slider';
import Footer from '../components/home/Footer';
import Categorias from '../components/home/Categorias'; // Importa el componente Categorias
import { motion } from 'framer-motion';
import Teacompanamos from '../components/home/Teacompanamos';

const Home = () => {

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

  return (
    <div className="text-white">
      {/* Navbar */}
      <Navbar />
  
      {/* Slider con texto superpuesto */}
      <div className="relative">
        <Slider />

      <Teacompanamos />
  
      {/* Componente Categorías */}
      <Categorias />
  
      {/* Footer */}
      <Footer />
      </div>
    </div>
  );
};

export default Home;