import React from 'react';

// Asegúrate de reemplazar el número con el número de WhatsApp correcto (incluyendo el código de país)
const WhatsAppIcon = () => {
  const whatsappNumber = '902207108'; // Reemplaza con tu número de WhatsApp
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-5 z-50 p-3 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // Icono de WhatsApp
        alt="WhatsApp"
        className="w-12 h-12"
      />
    </a>
  );
};

export default WhatsAppIcon;
