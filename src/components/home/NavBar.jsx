import { useState, useEffect } from 'react';
import logo from '../../img/logorci-white.png';
import logoBlack from '../../img/logorci-black.png';
import { Heart } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritosContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { favoritos } = useFavoritos();
  const location = useLocation();

  // Check if current route should have white background
  const isWhiteBackground = ['/catalogo', '/favoritos'].includes(location.pathname);

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
      <nav
        className={`fixed top-0 left-0 w-full p-6 flex flex-col justify-center items-center z-20 transition-all duration-300 ${
          isScrolled || isOpen || isWhiteBackground
            ? 'bg-white shadow-sm'
            : 'bg-transparent backdrop-blur-sm'
        }`}
        style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}
      >
        <div className="mb-4">
          <a href="/">
            <img
              src={isScrolled || isOpen || isWhiteBackground ? logoBlack : logo}
              alt="RCI Logo"
              className="h-16"
            />
          </a>
        </div>

        <div className="hidden md:flex space-x-8 z-30">
          <ul className="flex space-x-8">
            <li>
              <a
                href="/"
                className={`${
                  isScrolled || isOpen || isWhiteBackground ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest`}
                style={{ fontSize: '16px' }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/ecoAmigable"
                className={`${
                  isScrolled || isOpen || isWhiteBackground ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest`}
                style={{ fontSize: '16px' }}
              >
                Eco Amigable
              </a>
            </li>
            <li>
              <a
                href="/laEmpresa"
                className={`${
                  isScrolled || isOpen || isWhiteBackground ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest`}
                style={{ fontSize: '16px' }}
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
                  isScrolled || isOpen || isWhiteBackground ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest`}
                style={{ fontSize: '16px' }}
              >
                Catálogo
              </a>
            </li>
            <li>
              <a
                href="/clientes"
                className={`${
                  isScrolled || isOpen || isWhiteBackground ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest`}
                style={{ fontSize: '16px' }}
              >
                Clientes
              </a>
            </li>
            <li>
              <a
                href="/contacto"
                className={`${
                  isScrolled || isOpen || isWhiteBackground ? 'text-black' : 'text-white'
                } hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest`}
                style={{ fontSize: '16px' }}
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div className="absolute right-4 top-6 flex items-center space-x-4">
          <Link to="/favoritos" className="relative">
            <Heart
              className={`w-6 h-6 ${
                isScrolled || isOpen || isWhiteBackground ? 'text-red-500' : 'text-white'
              }`}
            />
            {favoritos.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {favoritos.length}
              </span>
            )}
          </Link>

          <button
            onClick={toggleMenu}
            className={`md:hidden ${
              isScrolled || isOpen || isWhiteBackground ? 'text-black' : 'text-white'
            } focus:outline-none hover:scale-110 transition-transform duration-300 text-3xl p-3`}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div 
          className="fixed top-[120px] left-0 w-full bg-white z-40 md:hidden shadow-lg"
          style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}
        >
          <ul className="flex flex-col space-y-4 p-6">
            <li>
              <a
                href="/"
                className="block text-black hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest"
                style={{ fontSize: '16px' }}
                onClick={toggleMenu}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/ecoAmigable"
                className="block text-black hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest"
                style={{ fontSize: '16px' }}
                onClick={toggleMenu}
              >
                Eco Amigable
              </a>
            </li>
            <li>
              <a
                href="/laEmpresa"
                className="block text-black hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest"
                style={{ fontSize: '16px' }}
                onClick={toggleMenu}
              >
                La Empresa
              </a>
            </li>
            <li>
              <a
                href="/catalogo"
                className="block text-black hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest"
                style={{ fontSize: '16px' }}
                onClick={toggleMenu}
              >
                Catálogo
              </a>
            </li>
            <li>
              <a
                href="/clientes"
                className="block text-black hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest"
                style={{ fontSize: '16px' }}
                onClick={toggleMenu}
              >
                Clientes
              </a>
            </li>
            <li>
              <a
                href="/contacto"
                className="block text-black hover:text-gray-900 text-base font-normal transition-all duration-300 hover:tracking-widest"
                style={{ fontSize: '16px' }}
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