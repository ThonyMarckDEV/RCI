import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../img/1.jpg';
import img2 from '../../img/2.jpg';
import img3 from '../../img/3.jpg';
import img4 from '../../img/4.jpg';

// Arreglo de objetos con las imágenes, contenido asociado y rutas
const slides = [
  {
    image: img1,
    title: "Cocinas Elegantes",
    description: "Descubre nuestra colección exclusiva de cocinas modernas y clásicas, diseñadas para brindar estilo y funcionalidad.",
    buttonText: "Ver más",
    buttonLink: "/catalogo?categoria=Cocinas", // Ruta para el botón
  },
  {
    image: img2,
    title: "Escritorios",
    description: "Explora nuestra variedad de escritorios ergonómicos y modernos, perfectos para tu espacio de trabajo.",
    buttonText: "Explorar",
    buttonLink: "/catalogo?categoria=Escritorios", // Ruta para el botón
  },
  {
    image: img3,
    title: "Sofás y Muebles",
    description: "Encuentra sofás y muebles de alta calidad, diseñados para ofrecer comodidad y elegancia a tu hogar.",
    buttonText: "Descubrir",
    buttonLink: "/catalogo?categoria=Sofas", // Ruta para el botón
  },
  {
    image: img4,
    title: "Centros de Entretenimiento",
    description: "Explora nuestros modernos centros de entretenimiento, diseñados para brindarte comodidad y estilo.",
    buttonText: "Comprar ahora",
    buttonLink: "/catalogo?categoria=Centros+De+Entretenimiento", // Ruta para el botón
  }  
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
          return 0;
        }
        return prevProgress + 8; // Ajusta la velocidad de la barra de progreso
      });
    }, 300); // Ajusta el tiempo de cambio de imagen

    return () => clearInterval(interval);
  }, []);

  const goToImage = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Contenedor de la imagen */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div key={index} className="absolute inset-0">
            {/* Imagen con animación de zoom out y zoom in */}
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                index === currentIndex
                  ? 'opacity-100 scale-100' // Imagen actual: visible y tamaño normal
                  : 'opacity-0 scale-125'   // Otras imágenes: invisible y más grande (zoom in)
              }`}
            />
            {/* Overlay negro semitransparente (con z-index bajo) */}
            <div
              className={`absolute inset-0 bg-black/30 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ zIndex: 1 }} // Asegura que el overlay esté detrás del contenido
            />

          {/* Texto y botón "Ver más" (con z-index mayor) */}
          <div
            className={`absolute left-8 sm:left-12 md:left-24 lg:left-32 top-[55%] transform -translate-y-1/2 text-white transition-all duration-1000 ${
              index === currentIndex
                ? 'opacity-100 translate-x-0' // Visible y en su posición final
                : 'opacity-0 translate-x-full' // Invisible y desplazado a la derecha
            }`}
            style={{ 
              zIndex: 2, 
              maxWidth: '36rem',
              fontFamily: "'Didot', 'Didot LT STD', 'Hoefler Text', Garamond, 'Times New Roman', serif" 
            }} // Asegura que el contenido esté por encima del overlay
          >
            {/* Título con Didot */}
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-slide-right-back"
              style={{ fontFamily: "'Didot', 'Didot LT STD', 'Hoefler Text', Garamond, 'Times New Roman', serif" }}
            >
              {slide.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans mb-6 sm:mb-8 animate-slide-right-back">
  {slide.description}
</p>

            {/* Botón con Link */}
            <Link to={slide.buttonLink}>
              <button
                className="bg-white text-black py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold text-lg sm:text-xl hover:bg-gray-100 transition-all duration-300 animate-slide-right-back"
              >
                {slide.buttonText}
              </button>
            </Link>
          </div>

          </div>
        ))}
      </div>

      {/* Indicadores (bolitas) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/30 z-10">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Slider;