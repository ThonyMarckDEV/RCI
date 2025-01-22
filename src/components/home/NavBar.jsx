// Navbar.js
import { useState } from 'react';
import logo from '../../img/logorci.png';
import { Heart } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritosContext'; // Importar el contexto
import { Link } from 'react-router-dom'; // Importar Link para la navegación

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favoritos } = useFavoritos(); // Usar el contexto

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Navbar con transparencia y blur */}
      <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-white z-20 lg:z-50 shadow-sm">
        <div className="hover:scale-105 transition-transform duration-500">
          <a href="/"><img src={logo} alt="RCI Logo" className="h-12" /></a>
        </div>
  
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 z-30">
          <li>
            <a
              href="/"
              className="text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/ecoAmigable"
              className="text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
            >
              Eco Amigable
            </a>
          </li>
          <li>
            <a
              href="/laEmpresa"
              className="text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
            >
              La Empresa
            </a>
          </li>
          <li>
            <a
              href="/catalogo"
              className="text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
            >
              Catalogo
            </a>
          </li>
          <li>
            <a
              href="/clientes"
              className="text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
            >
              Clientes
            </a>
          </li>
          <li>
            <a
              href="/contacto"
              className="text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
            >
              Contacto
            </a>
          </li>
        </ul>

        {/* Contador de favoritos y botón de menú (móvil) */}
        <div className="flex items-center space-x-4">
          {/* Contador de favoritos */}
          <Link to="/favoritos" className="relative"> {/* Enlace a /favoritos */}
            <Heart className="w-6 h-6 text-red-500" />
            {favoritos.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {favoritos.length}
              </span>
            )}
          </Link>

          {/* Botón de menú hamburguesa */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-black focus:outline-none hover:scale-110 transition-transform duration-300 text-3xl p-3"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
  
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed top-[76px] left-0 w-full bg-white transform transition-transform duration-300 ease-in-out z-10 md:hidden shadow-lg ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <ul className="flex flex-col space-y-4 p-6">
          <li>
            <a
              href="/"
              className="block text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
              onClick={toggleMenu}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="/ecoAmigable"
              className="block text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
              onClick={toggleMenu}
            >
              Eco Amigable
            </a>
          </li>
          <li>
            <a
              href="/laEmpresa"
              className="block text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
              onClick={toggleMenu}
            >
              La Empresa
            </a>
          </li>
          <li>
            <a
              href="/catalogo"
              className="block text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
              onClick={toggleMenu}
            >
              Catalogo
            </a>
          </li>
          <li>
            <a
              href="/clientes"
              className="block text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
              onClick={toggleMenu}
            >
              Clientes
            </a>
          </li>
          <li>
            <a
              href="/contacto"
              className="block text-black hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest"
              onClick={toggleMenu}
            >
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;