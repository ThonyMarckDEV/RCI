import React, { useState } from 'react';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import Filtrador from '../components/home/Filtrador';
import ProductosCatalogo from '../components/home/ProductosCatalogo';
import API_BASE_URL from '../js/urlHelper';

const Catalogo = () => {
  const [filtros, setFiltros] = useState({ nombre: '', categoria: '' });
  const [categorias, setCategorias] = useState([]);

  // Simulación de carga de categorías (debes reemplazar esto con una llamada a tu API)
  React.useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch(`${API_BASE_URL}/api/listarCategorias`);
      const data = await response.json();
      setCategorias(data.data);
    };
    fetchCategorias();
  }, []);

  return (
    <div className="bg-white font-light text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="container mx-auto px-6 pt-32 pb-24">
        <Filtrador onFilterApply={setFiltros} categorias={categorias} />
        <ProductosCatalogo filtros={filtros} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Catalogo;