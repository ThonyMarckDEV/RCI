import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';  // Importar hook

const InfoSection = () => {
  // Esto se ejecuta cada vez que se carga el componente (al cambiar de ruta)
  useEffect(() => {
    window.scrollTo(0, 0); // Esto desplazará la página al inicio
  }, []);

  // Usamos el hook useInView para detectar cuando la sección es visible
  const { ref, inView } = useInView({
    triggerOnce: true,  // Solo se activa la animación una vez cuando la sección entra en vista
    threshold: 0.3,     // Considera que el elemento está en vista cuando el 30% de él es visible
  });

  return (
    <div 
      ref={ref} 
      className="relative flex items-center justify-center h-screen bg-slate-50 px-4 sm:px-16 overflow-hidden"
    >
      {/* Central content */}
      <div className="text-center z-10">
        {/* Animación de deslizamiento del texto */}
        <motion.h2
          className="text-4xl sm:text-6xl font-serif text-slate-900 italic"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: inView ? 0 : -100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.5 }}  // Aumentamos la duración a 1.5 segundos
        >
          Transformamos tus ideas en realidad
        </motion.h2>
        <motion.h2
          className="text-4xl sm:text-6xl font-serif text-slate-900 italic mt-2"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: inView ? 0 : -100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}  // Aumentamos la duración a 1.5 segundos y el delay a 0.3 segundos
        >
          creando espacios que inspiran y conectan
        </motion.h2>
        <motion.h2
          className="text-4xl sm:text-6xl font-serif text-slate-900 italic mt-2"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: inView ? 0 : -100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}  // Aumentamos la duración a 1.5 segundos y el delay a 0.6 segundos
        >
          con tu visión y estilo único
        </motion.h2>

        {/* Animación del botón */}
        <Link to="/laEmpresa">
          <motion.button
            className="mt-8 px-6 py-3 sm:px-10 sm:py-5 border border-slate-900 text-slate-900 text-xl sm:text-2xl font-serif italic hover:bg-slate-900 hover:text-white transition-all"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.9 }}  // Aumentamos la duración a 1.5 segundos y el delay a 0.9 segundos
          >
            SABER MÁS
          </motion.button>
        </Link>
      </div>

      {/* Rotating circle with text - hidden on mobile, visible from md breakpoint up */}
      <motion.div
        className="hidden md:flex absolute -right-[300px] top-1/6 transform -translate-y-1/2 w-[600px] h-[600px] items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}  // Aumentamos la duración de la rotación a 30 segundos
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