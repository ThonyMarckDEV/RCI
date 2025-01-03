import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Para React Leaflet 3.x.x
import L from 'leaflet';
import Navbar from '../components/home/NavBar';
import Footer from '../components/home/Footer';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import pinImage from '../img/marcadorRci.png';


const Contacto = () => {
  // Estado para el formulario
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  // Manejo del cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario, por ejemplo a través de una API
    alert('Formulario enviado');
  };

  return (
    <div className="bg-white font-light text-gray-800 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

        {/* Información de contacto */}
        <div className="flex flex-wrap justify-center mt-24 gap-8">
        {/* Dirección */}
        <div className="w-full sm:w-1/3 p-6 bg-white border-2 border-black rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-black mb-4">Dirección</h3>
            <p className="text-lg text-gray-700">Parque 45-2, Talara - Piura</p>
            <p className="text-lg text-gray-700">Av. Gral. Juan Antonio Pezet 1629, San Isidro - Lima</p>
        </div>
        {/* Teléfono */}
        <div className="w-full sm:w-1/3 p-6 bg-white border-2 border-black rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-black mb-4">Teléfono</h3>
            <p className="text-lg text-gray-700">(073) 38 3432 - anexo 20</p>
        </div>
        {/* Correo Electrónico */}
        <div className="w-full sm:w-1/3 p-6 bg-white border-2 border-black rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-black mb-4">Correo Electrónico</h3>
            <p className="text-lg text-gray-700">talara@mueblesrci.com</p>
            <p className="text-lg text-gray-700">ventas@mueblesrci.com</p>
        </div>
        </div>

        {/* Ubícanos */}
        <div className="text-center mb-12 sm:mb-16 mt-20"> {/* Añadí un margin-top de mt-20 */}
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1 } },
            }}
        >
            <h2 className="text-4xl md:text-5xl font-semibold text-yellow-500 mb-4">
            ¡Ubícanos!
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div> {/* Reducido el margin-bottom */}
        </motion.div>
        </div>

        {/* Mapa con Pin */}
        <div className="relative mb-16 mt-2" style={{ position: 'relative', zIndex: 1 }}>
        <MapContainer
            center={[-4.5848497, -81.2683865]}
            zoom={15}
            style={{
            height: '400px', // Altura por defecto para móviles
            }}
            className="mx-auto w-4/5 lg:w-2/5 lg:h-[500px]" // Ancho 80% en móviles y 50% en pantallas grandes, altura mayor en pantallas grandes
        >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
            position={[-4.5848497, -81.2683865]} 
            icon={new L.Icon({
                iconUrl: pinImage, // Ruta a la imagen del pin
                iconSize: [100, 100],
                iconAnchor: [50, 100], // Para que el pin se posicione correctamente
            })}
            >
            <Popup>
                <strong>Muebles RCI</strong><br />
                Dirección: Av. Muebles RCI 123, Lima, Perú
            </Popup>
            </Marker>
        </MapContainer>
        </div>



      {/* Contactanos */}
      <div className="flex-1 py-16 px-6 sm:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1 } },
          }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-yellow-500 mb-4">
            ¡Contáctanos!
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
        </motion.div>

       {/* Formulario de contacto */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg shadow-md mx-auto lg:w-[80%]">
            <h3 className="text-2xl font-semibold text-center mb-8">Déjanos tu mensaje</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />
                </div>
                <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Correo Electrónico</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />
                </div>
                <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Comentario</label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows="4"
                    required
                />
                </div>
                <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
                >
                Enviar Mensaje
                </button>
            </form>
            </div>
        </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contacto;
