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
    <div className="bg-white text-white">
      {/* Navbar */}
      <Navbar />
  
      {/* Slider con texto superpuesto */}
      <div className="relative">
        <Slider />

      <Teacompanamos />
  
      {/* Contenido del Hero Section */}
      <div className="container relative z-10 mx-auto px-10 text-center">
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl lg:text-8xl font-light text-black mb-8"
        >
          Categorias
        </motion.h1>
        <div className="w-32 h-1 bg-black mb-8 mx-auto"></div>
      </div>
  
      {/* Componente Categorías */}
      <Categorias />
  
      {/* Footer */}
      <Footer />
      </div>
    </div>
  );
};

export default Home;