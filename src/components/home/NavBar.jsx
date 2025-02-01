import { useState, useEffect } from 'react';
import logo from '../../img/logorci-white.png';
import logoBlack from '../../img/logorci-black.png'; // Importa el logo negro
import { Heart } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritosContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { favoritos } = useFavoritos();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar con transparencia y blur */}
      <nav
        className={`fixed top-0 left-0 w-full p-6 flex flex-col justify-center items-center z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? 'bg-white shadow-sm'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        {/* Logo centrado */}
        <div className="mb-4"> {/* Margen inferior para separar el logo de las subcategorías */}
          <a href="/">
            <img
              src={isScrolled || isOpen ? logoBlack : logo} // Cambia el logo según el estado
              alt="RCI Logo"
              className="h-16"
            />
          </a>
        </div>

        {/* Menú de subcategorías (solo en PC) */}
        <div className="hidden md:flex space-x-8 z-30">
          <ul className="flex space-x-8">
            <li>
              <a
                href="/"
                className={`${
                  isScrolled || isOpen ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/ecoAmigable"
                className={`${
                  isScrolled || isOpen ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest`}
              >
                Eco Amigable
              </a>
            </li>
            <li>
              <a
                href="/laEmpresa"
                className={`${
                  isScrolled || isOpen ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest`}
              >
                La Empresa
              </a>
            </li>
          </ul>
          <ul className="flex space-x-8">
            <li>
              <a
                href="/catalogo"
                className={`${
                  isScrolled || isOpen ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest`}
              >
                Catalogo
              </a>
            </li>
            <li>
              <a
                href="/clientes"
                className={`${
                  isScrolled || isOpen ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest`}
              >
                Clientes
              </a>
            </li>
            <li>
              <a
                href="/contacto"
                className={`${
                  isScrolled || isOpen ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-lg font-serif font-medium transition-all duration-300 hover:tracking-widest`}
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Contador de favoritos y botón de menú (móvil) */}
        <div className="absolute right-4 top-6 flex items-center space-x-4">
          {/* Contador de favoritos */}
          <Link to="/favoritos" className="relative">
            <Heart
              className={`w-6 h-6 ${
                isScrolled || isOpen ? 'text-red-500' : 'text-white'
              }`}
            />
            {favoritos.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {favoritos.length}
              </span>
            )}
          </Link>

          {/* Botón de menú hamburguesa */}
          <button
            onClick={toggleMenu}
            className={`md:hidden ${
              isScrolled || isOpen ? 'text-black' : 'text-white'
            } focus:outline-none hover:scale-110 transition-transform duration-300 text-3xl p-3`}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && ( // Solo renderiza el menú deslizable si isOpen es true
        <div
          className={`fixed top-[120px] left-0 w-full bg-white z-40 md:hidden shadow-lg`}
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
      )}
    </>
  );
};

export default Navbar;