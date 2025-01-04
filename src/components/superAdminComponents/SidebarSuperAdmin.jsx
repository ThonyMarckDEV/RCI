import React, { useState, useEffect } from 'react';
import LogoutButton from '../LogoutButton';
import {
  AiFillHome,
  AiFillSetting,
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineDown,
  AiOutlineMenu,
  AiOutlineMenuFold,
} from 'react-icons/ai';

function SidebarSuperAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openTallas, setOpenTallas] = useState(false);
  const [openCategorias, setOpenCategorias] = useState(false);

  // Cierra la sidebar al hacer clic fuera (solo en móviles)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isSidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.menu-button')) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isSidebarOpen]);

  return (
    <div>
      {/* Botón de menú solo visible en dispositivos móviles */}
      <button
        className="menu-button lg:hidden fixed top-4 left-4 z-50 text-white bg-black p-2 rounded-lg focus:outline-none hover:bg-gray-800"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <AiOutlineMenu className="text-2xl" />
      </button>
  
      {/* Sidebar */}
      <div
        className={`sidebar fixed lg:relative top-0 left-0 h-full bg-white text-black shadow-lg p-6 w-64 transform lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:block transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-500">SuperAdmin Panel</h2>
            <ul>
  
              {/* Dashboard */}
              <li className="mb-4">
                <a
                  href="/dashboard"
                  className="flex items-center text-lg bg-white text-black hover:bg-gray-100 p-2 rounded-lg transition-all duration-300"
                >
                  <AiFillHome className="mr-4 text-xl" />
                  <span>Dashboard</span>
                </a>
              </li>
  
              {/* Usuarios */}
              <li className="mb-4">
                <div
                  className="flex items-center justify-between text-lg bg-white text-black hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition-all duration-300"
                  onClick={() => setOpenUsuarios(!openUsuarios)}
                >
                  <div className="flex items-center">
                    <AiOutlineUser className="mr-4 text-xl" />
                    <span>Usuarios</span>
                  </div>
                  <AiOutlineDown className={`transition-transform ${openUsuarios ? 'rotate-180' : ''}`} />
                </div>
                {openUsuarios && (
                  <ul className="ml-8 mt-2 space-y-2">
                    <li>
                      <a href="/superAdmin/usuarios/agregar" className="text-black hover:text-gray-600 transition-all duration-300">
                        Agregar Usuarios
                      </a>
                    </li>
                    <li>
                      <a href="/superAdmin/usuarios/editar" className="text-black hover:text-gray-600 transition-all duration-300">
                        Editar Usuarios
                      </a>
                    </li>
                  </ul>
                )}
              </li>
  
              {/* Categorías */}
              <li className="mb-4">
                <div
                  className="flex items-center justify-between text-lg bg-white text-black hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition-all duration-300"
                  onClick={() => setOpenCategorias(!openCategorias)}
                >
                  <div className="flex items-center">
                    <AiOutlineMenuFold className="mr-4 text-xl" />
                    <span>Categorías</span>
                  </div>
                  <AiOutlineDown className={`transition-transform ${openCategorias ? 'rotate-180' : ''}`} />
                </div>
                {openCategorias && (
                  <ul className="ml-8 mt-2 space-y-2">
                    <li>
                      <a href="/superAdmin/categorias/agregar" className="text-black hover:text-gray-600 transition-all duration-300">
                        Agregar Categorías
                      </a>
                    </li>
                    <li>
                      <a href="/superAdmin/categorias/editar" className="text-black hover:text-gray-600 transition-all duration-300">
                        Editar Categorías
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
  
          {/* Botón de Cerrar Sesión */}
          <div className="mt-auto">
            <LogoutButton className="bg-black hover:bg-gray-800 text-white w-full py-2 rounded-lg text-lg font-bold transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );  
}

export default SidebarSuperAdmin;
