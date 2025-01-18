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
    window.scrollTo(0, 0);
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
      <Navbar className="fixed top-0 w-full z-50 animate-slide-down" />
      
      {/* Filtrador */}
      <Filtrador 
        onFilterApply={setFiltros} 
        categorias={categorias} 
        className="animate-fade-in"
      />
      
      {/* Main content */}
      <main className="flex-grow pt-32 lg:pt-20 pb-16">
        {/* Title section */}
        <div className="px-6">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-light text-gray-900 mb-6 text-center animate-fade-in-up">
            Catálogo
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mb-8 mx-auto animate-slide-up"></div>
        </div>
        
        {/* Products section */}
        <div className="px-6">
          <ProductosCatalogo 
            filtros={filtros} 
            className="animate-slide-down"
          />
        </div>
      </main>
      
      {/* Footer */}
      <Footer className="animate-slide-up" />
    </div>
  );
};

export default Catalogo;