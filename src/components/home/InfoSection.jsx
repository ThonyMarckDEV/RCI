import React from 'react';

import empresa from '../../img/empresa.jpg';
import catalogo from '../../img/catalogo.jpg';
import contacto from '../../img/contacto.jpg';

const InfoSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Empresa */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform transition duration-500 hover:scale-105">
            <div className="h-64">
              <img
                src={empresa}
                alt="Empresa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-900">EMPRESA</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                RCI tiene veinte años de experiencia en la compra y venta de artículos para el hogar. Los principales productos estaban...
              </p>
            </div>
          </div>

          {/* Catálogo */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform transition duration-500 hover:scale-105">
            <div className="h-64">
              <img
                src={catalogo}
                alt="Catálogo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-900">CATÁLOGO</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Amoblamos oficinas y hogares con diseños exclusivos y procesos que cumplen con normas internacionales de calidad...
              </p>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform transition duration-500 hover:scale-105">
            <div className="h-64">
              <img
                src={contacto}
                alt="Contacto"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-gray-900">CONTACTO</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Ofrecemos atención personalizada de Lunes a Sábado de 9am a 9pm y Domingos de 9am a 1pm...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
