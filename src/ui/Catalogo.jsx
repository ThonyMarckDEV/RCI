// Catalogo.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import Filtrador from '../components/home/Filtrador';
import ProductosCatalogo from '../components/home/ProductosCatalogo';
import API_BASE_URL from '../js/urlHelper';

const Catalogo = () => {
  const [filtros, setFiltros] = useState({ nombre: '', categoria: '' });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar al principio sin animación
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/listarCategoriasFiltrador`);
        if (!response.ok) {
          throw new Error('Error al cargar las categorías');
        }
        const data = await response.json();
        setCategorias(data.data || []);
      } catch (error) {
        console.error('Error fetching categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white font-light text-gray-800">
      {/* Navbar */}
      <Navbar className="fixed top-0 w-full z-50" />
      
      {/* Filtrador */}
      <Filtrador onFilterApply={setFiltros} categorias={categorias} />
      
      {/* Main content */}
      <main className="flex-grow pt-32 lg:pt-20 lg:ml-80 pb-16"> {/* Added padding bottom for pagination */}
        {/* Title section */}
        <div className="px-6">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-light text-gray-900 mb-6 text-center">
            Catálogo
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mb-8 mx-auto"></div>
        </div>
        
        {/* Products section */}
        <div className="px-6">
          <ProductosCatalogo filtros={filtros} />
        </div>
      </main>
      
      {/* Footer */}
      <Footer className="lg:ml-80" />
    </div>
  );
};

export default Catalogo;
