import React from 'react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; // Íconos de React Icons
import logoeco from '../../img/eco.png';

const Footer = () => {
  return (
    <div className="bg-yellow-400 text-gray-800 py-12">
      <div className="container mx-auto px-6">
        {/* Contenedor de columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-3xl font-extrabold tracking-wider mb-4">
              Muebles RCI
            </div>
            <p className="text-center md:text-left text-lg font-medium flex items-center">
              <img src={logoeco} alt="Eco Friendly Logo" className="w-12 h-12 mr-4" />
              Somos eco amigables, trabajamos con madera certificada
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-600">Inicio</a></li>
              <li><a href="#" className="hover:text-gray-600">Nosotros</a></li>
              <li><a href="#" className="hover:text-gray-600">Servicios</a></li>
              <li><a href="#" className="hover:text-gray-600">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Información de contacto */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-2" />
                Av. Principal 123, Lima, Perú
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaPhone className="mr-2" />
                +51 987 654 321
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2" />
                info@mueblesrci.com
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes sociales */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-gray-800 hover:text-gray-600">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Muebles RCI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;