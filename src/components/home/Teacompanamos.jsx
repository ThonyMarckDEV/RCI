import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const InfoSection = () => {
  // Esto se ejecuta cada vez que se carga el componente (al cambiar de ruta)
  useEffect(() => {
    window.scrollTo(0, 0); // Esto desplazará la página al inicio
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen bg-slate-50 px-16 overflow-hidden">
      {/* Central content */}
      <div className="text-center z-10">
      <h2 className="text-6xl font-serif text-slate-900 italic">Transformamos tus ideas en realidad</h2>
      <h2 className="text-6xl font-serif text-slate-900 italic mt-2">creando espacios que inspiran y conectan</h2>
      <h2 className="text-6xl font-serif text-slate-900 italic mt-2">con tu visión y estilo único</h2>
        <Link to="/laEmpresa">
          <button className="mt-8 px-10 py-5 border border-slate-900 text-slate-900 text-2xl font-serif italic hover:bg-slate-900 hover:text-white transition-all">
            SABER MÁS
          </button>
        </Link>
      </div>

      {/* Rotating circle with text - hidden on mobile, visible from md breakpoint up */}
      <motion.div 
        className="hidden md:flex absolute -right-[300px] top-1/6 transform -translate-y-1/2 w-[600px] h-[600px] items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M300,300 m-240,0 a240,240 0 1,1 480,0 a240,240 0 1,1 -480,0"
              fill="transparent"
            />
          </defs>
          <text fontSize="42" fontFamily="serif" fill="slate-900">
            <textPath href="#circlePath" startOffset="0%">
              RCIHome • RCIHome • RCIHome • RCIHome • RCIHome • RCIHome • RCIHome • RCIHome • RCIHome • RCIHome • RCIHome • RCIHome •
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
};

export default InfoSection;
