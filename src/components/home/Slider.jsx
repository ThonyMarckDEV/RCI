import React, { useState, useEffect } from 'react';
import img1 from '../../img/1.jpg';
import img2 from '../../img/2.jpg';
import img3 from '../../img/3.jpg';
import img4 from '../../img/4.jpg';

const images = [img1, img2, img3, img4];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
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
        {images.map((image, index) => (
          <div key={index} className="absolute inset-0">
            {/* Imagen con animación de zoom out y zoom in */}
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                index === currentIndex
                  ? 'opacity-100 scale-100' // Imagen actual: visible y tamaño normal
                  : 'opacity-0 scale-125'   // Otras imágenes: invisible y más grande (zoom in)
              }`}
            />
            {/* Overlay negro semitransparente */}
            <div
              className={`absolute inset-0 bg-black/30 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Texto y botón "Ver más" */}
            <div
              className={`absolute left-4 sm:left-8 md:left-16 top-1/2 transform -translate-y-1/2 text-white transition-all duration-1000 ${
                index === currentIndex
                  ? 'opacity-100 translate-x-0' // Visible y en su posición final
                  : 'opacity-0 translate-x-full' // Invisible y desplazado a la derecha
              }`}
            >
              {/* Título */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 animate-slide-right-back">
                Muebles Elegantes
              </h1>
              {/* Descripción */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans mb-6 sm:mb-8 animate-slide-right-back">
                Descubre nuestra colección exclusiva de muebles modernos y clásicos.
              </p>
              {/* Botón "Ver más" */}
              <button
                className="bg-white text-black py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold text-lg sm:text-xl hover:bg-gray-100 transition-all duration-300 animate-slide-right-back"
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores (bolitas) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
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
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/30">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Slider;