import React, { useState, useEffect } from 'react';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import API_BASE_URL from '../../js/urlHelper';
import CaracteristicasProducto from './CaracteristicasProducto';
import ProductosRelacionados from './ProductosRelacionados'; // Importar el nuevo componente

const DetalleProducto = ({ producto, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(0);
  const [imagenActual, setImagenActual] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [caracteristicas, setCaracteristicas] = useState(null);

  const modeloActual = producto.modelos[modeloSeleccionado] || {};
  const imagenes = modeloActual.imagenes || [];

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // Simular la carga de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Activar el estado de carga global

        // Simular la carga de características
        const response = await fetch(`${API_BASE_URL}/api/productos/${producto.idProducto}/caracteristicas`);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success) {
          // Filtrar características para excluir IDs
          const filteredData = Object.fromEntries(
            Object.entries(data.data).filter(
              ([key]) => !key.toLowerCase().includes('id') && !key.toLowerCase().includes('_id')
            )
          );
          setCaracteristicas(filteredData);
        } else {
          setCaracteristicas(null);
        }

        // Simular un tiempo de carga (por ejemplo, 1 segundo)
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setCaracteristicas(null);
      } finally {
        setLoading(false); // Desactivar el estado de carga global
      }
    };

    fetchData();
  }, [producto.idProducto]);

  const handleModeloChange = (index) => {
    setModeloSeleccionado(index);
    setImagenActual(0);
  };

  const handleImageChange = (newIndex) => {
    if (!transitioning) {
      setTransitioning(true);
      setImagenActual(newIndex);
      setTimeout(() => setTransitioning(false), 300);
    }
  };

  const shareUrl = `${window.location.origin}/catalogo?nombre=${encodeURIComponent(producto.nombreProducto)}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: producto.nombreProducto,
          text: `¡Mira este producto: ${producto.nombreProducto} - ${modeloActual.nombreModelo}!`,
          url: shareUrl,
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
            url: shareUrl,
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

    window.open(`https://wa.me/+51902207108?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-x-0 bottom-0 h-[85vh] bg-white z-50 flex flex-col overflow-y-auto shadow-lg border-t border-gray-200">
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{producto.nombreProducto}</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <FaTimes className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Image Section - Updated */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Main Image - Modified container */}
              <div className="relative w-full mb-8">
                <div className="aspect-square w-full rounded-lg overflow-hidden">
                  {imagenes[imagenActual] && (
                    <img
                      src={`${API_BASE_URL}/storage/${imagenes[imagenActual].urlImagen}`}
                      alt={modeloActual.nombreModelo}
                      className="w-full h-full object-contain bg-gray-50"
                    />
                  )}
                </div>
              </div>
  
              {/* Navigation Arrows */}
              {imagenes.length > 1 && (
                <>
                  <button
                    onClick={() => handleImageChange((imagenActual - 1 + imagenes.length) % imagenes.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg"
                  >
                    <FaChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleImageChange((imagenActual + 1) % imagenes.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg"
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
  
              {/* Image Indicators - adjusted margin */}
              <div className="flex justify-center gap-2 mt-4 mb-6">
                {imagenes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      imagenActual === index ? 'bg-gray-800 w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
  
          {/* Product Details Section */}
          <div className="w-full md:w-1/2">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                {producto.nombreCategoria}
              </span>
            </div>

            {/* Model Selection */}
            <div className="flex flex-wrap gap-2 mb-6">
              {producto.modelos.map((modelo, index) => (
                <button
                  key={modelo.idModelo}
                  onClick={() => handleModeloChange(index)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    modeloSeleccionado === index
                      ? 'bg-black text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {modelo.nombreModelo}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <FaShareAlt className="w-5 h-5" />
                <span>Compartir</span>
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Cotizar</span>
              </button>
            </div>

            {/* Product Description */}
            <div className="mb-8">
              <p className="text-gray-600">{producto.descripcion}</p>
            </div>

            {/* Thumbnails - Moved here */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
              {imagenes.map((imagen, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    imagenActual === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img
                    src={`${API_BASE_URL}/storage/${imagen.urlImagen}`}
                    alt={`${modeloActual.nombreModelo} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <CaracteristicasProducto caracteristicas={caracteristicas} />

        {/* Related Products */}
        <ProductosRelacionados productoId={producto.idProducto} />
      </div>
    </div>
  );
};

export default DetalleProducto;