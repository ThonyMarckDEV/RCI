import React from 'react';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';


const Catalogo = () => {
  return (
    <div className="bg-white font-light text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="container mx-auto px-6 pt-32 pb-24 flex flex-col justify-center items-center"> {/* Added pb-24 for bottom padding */}

      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Catalogo;