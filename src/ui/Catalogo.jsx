import React, { useState, useEffect } from 'react';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import Filtrador from '../components/home/Filtrador';
import ProductosCatalogo from '../components/home/ProductosCatalogo';
import API_BASE_URL from '../js/urlHelper';

const Catalogo = () => {
  const [filtros, setFiltros] = useState({ nombre: '', categoria: '' });
  const [categorias, setCategorias] = useState([]);

  // Carga de categorías desde la API
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/listarCategorias`);
        if (!response.ok) {
          throw new Error('Error al cargar las categorías');
        }
        const data = await response.json();
        setCategorias(data.data || []); // Asegúrate de que data.data sea un array
      } catch (error) {
        console.error('Error fetching categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="bg-white font-light text-gray-800">
      {/* Navbar con animación fade-in */}
      <Navbar className="animate-fade-in" />

      {/* Título del catálogo con animación slide-down */}
      <div className="container mx-auto px-6 pt-32 animate-slide-down">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-light text-gray-900 mb-6 text-center">
          Catálogo
        </h1>
        <div className="w-24 h-1 bg-yellow-500 mb-8 mx-auto"></div>
      </div>

      {/* Contenido principal con animación fade-in-up */}
      <div className="container mx-auto px-6 pb-24 animate-fade-in-up">
        {/* Filtrador con animación slide-up */}
        <Filtrador
          onFilterApply={setFiltros}
          categorias={categorias}
          className="animate-slide-up"
        />

        {/* ProductosCatalogo con animación fade-in */}
        <ProductosCatalogo filtros={filtros} className="animate-fade-in" />
      </div>

      {/* Footer con animación fade-in-down */}
      <Footer className="animate-fade-in-down" />
    </div>
  );
};

export default Catalogo;