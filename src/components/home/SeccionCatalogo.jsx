import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SeccionCatalogo = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center md:flex-row md:justify-center py-40 px-10 bg-gray-100"
    >
      {/* Imagen del catálogo */}
      <motion.div
        className="relative rounded-lg overflow-hidden mb-12 md:mb-0 md:mr-16 shadow-2xl"
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)', // Sombra personalizada más intensa
        }}
      >
       <img
          src="/img/catalogorci.png"
          alt="Nuestro Catálogo"
          className="w-64 md:w-80 lg:w-96" 
        />
      </motion.div>

      {/* Contenido del texto y botón */}
      <motion.div
        className="text-center md:text-left max-w-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-6">
          Nuestro Catálogo
        </h2>
        <p className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-10">
          Muebles y piezas que se adaptan perfectamente a tus espacios. Explora nuestra selección
          cuidadosamente diseñada para ofrecerte estilo y comodidad.
        </p>
        <motion.a
          href="/catalogo"
          className="inline-block px-8 py-4 bg-gray-800 text-white font-medium text-lg md:text-xl rounded-lg shadow-lg hover:bg-gray-700 focus:ring focus:ring-gray-400 transition"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          Ver Catálogo
        </motion.a>
      </motion.div>
    </div>
  );
};

export default SeccionCatalogo;
