import React, { useState } from 'react';
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaTimes, FaShare, FaInstagram, FaFacebook, FaCopy, FaCheck } from 'react-icons/fa';
import API_BASE_URL from '../../js/urlHelper';

const DetalleProducto = ({ producto, onClose, modeloInicial = 0 }) => {
  const [modeloSeleccionado, setModeloSeleccionado] = useState(modeloInicial);
  const [imagenActual, setImagenActual] = useState(0);
  const [direction, setDirection] = useState(0); // -1 para izquierda, 1 para derecha
  const [transitioning, setTransitioning] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const modeloActual = producto.modelos[modeloSeleccionado] || {};
  const imagenes = modeloActual.imagenes || [];
  
  const handleModeloChange = (index) => {
    setTransitioning(true);
    setTimeout(() => {
      setModeloSeleccionado(index);
      setImagenActual(0);
      setTransitioning(false);
    }, 300);
  };

  const handleImageTransition = (newIndex, newDirection) => {
    if (!transitioning) {
      setDirection(newDirection);
      setTransitioning(true);
      setTimeout(() => {
        setImagenActual(newIndex);
        setTransitioning(false);
      }, 300);
    }
  };

  const nextImage = () => {
    const newIndex = (imagenActual + 1) % imagenes.length;
    handleImageTransition(newIndex, 1);
  };

  const prevImage = () => {
    const newIndex = (imagenActual - 1 + imagenes.length) % imagenes.length;
    handleImageTransition(newIndex, -1);
  };

  // Generar enlace compartible
  const shareUrl = `${window.location.origin}/catalogo?nombre=${encodeURIComponent(producto.nombreProducto)}`;
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: producto.nombreProducto,
          text: `¡Mira este producto: ${producto.nombreProducto} - ${modeloActual.nombreModelo}!`,
          url: shareUrl
        });
      } catch (err) {
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleSocialShare = (platform) => {
    const text = encodeURIComponent(`¡Mira este producto: ${producto.nombreProducto} - ${modeloActual.nombreModelo}!`);
    const url = encodeURIComponent(shareUrl);
    
    let shareUrl;
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'instagram':
        if (navigator.share) {
          navigator.share({
            title: producto.nombreProducto,
            text: text,
            url: shareUrl
          });
          return;
        }
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `¡Hola! 👋\n\n` +
      `Me interesa obtener información sobre:\n` +
      `📦 Producto: ${producto.nombreProducto}\n` +
      `🎨 Modelo: ${modeloActual.nombreModelo}\n\n` +
      `Me gustaría conocer:\n` +
      `💰 Precio\n` +
      `🚚 Disponibilidad\n` +
      `📅 Tiempo de entrega\n\n` +
      `¡Gracias por su atención! 🙂`
    );
    
    window.open(
      `https://wa.me/+51902207108?text=${message}`,
      '_blank'
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <FaTimes className="w-5 h-5 text-gray-600" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Carrusel de imágenes */}
          <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            <div className="relative w-full h-full">
              <img
                key={`${modeloSeleccionado}-${imagenActual}`}
                src={`${API_BASE_URL}/storage/${imagenes[imagenActual]?.urlImagen}`}
                alt={modeloActual.nombreModelo}
                className={`absolute inset-0 w-full h-full object-contain transform transition-all duration-300 ease-in-out
                  ${transitioning 
                    ? `translate-x-${direction > 0 ? '-full' : 'full'} opacity-0` 
                    : 'translate-x-0 opacity-100'}`}
              />
              
              {/* Imagen previa para transición suave */}
              {transitioning && (
                <img
                  src={`${API_BASE_URL}/storage/${
                    imagenes[
                      direction > 0 
                        ? (imagenActual + 1) % imagenes.length
                        : (imagenActual - 1 + imagenes.length) % imagenes.length
                    ]?.urlImagen
                  }`}
                  alt="Next"
                  className={`absolute inset-0 w-full h-full object-contain transform transition-all duration-300 ease-in-out
                    translate-x-${direction > 0 ? 'full' : '-full'}`}
                />
              )}
            </div>
            
            {imagenes.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={transitioning}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  disabled={transitioning}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight className="w-5 h-5 text-gray-800" />
                </button>

                {/* Indicadores de imagen */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {imagenes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const newDirection = index > imagenActual ? 1 : -1;
                        handleImageTransition(index, newDirection);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === imagenActual
                          ? 'bg-yellow-500 w-4'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Contenido del producto */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {producto.nombreProducto}
            </h2>
            
            <p className="text-gray-600 mb-6">{producto.descripcion}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {producto.modelos.map((modelo, index) => (
                <button
                  key={modelo.idModelo}
                  onClick={() => handleModeloChange(index)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    modeloSeleccionado === index
                      ? 'bg-yellow-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {modelo.nombreModelo}
                </button>
              ))}
            </div>

            <div className="mb-8">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                {producto.nombreCategoria}
              </span>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-3 mt-auto">
              {/* Botón de compartir */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <FaShare className="w-5 h-5" />
                  Compartir
                </button>

                {/* Menú de compartir */}
                {showShareMenu && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg p-4">
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {copied ? <FaCheck className="w-5 h-5 text-green-500" /> : <FaCopy className="w-5 h-5 text-gray-600" />}
                        {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
                      </button>
                      
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleSocialShare('whatsapp')}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <FaWhatsapp className="w-6 h-6 text-green-500" />
                        </button>
                        <button
                          onClick={() => handleSocialShare('facebook')}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <FaFacebook className="w-6 h-6 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleSocialShare('instagram')}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <FaInstagram className="w-6 h-6 text-pink-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Botón de WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                Cotízalo aquí
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;