import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../js/urlHelper';

const ProductosCatalogo = ({ filtros }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, [filtros]);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/listarProductosCatalogo?nombreProducto=${filtros.nombre}&categoria=${filtros.categoria}`
      );
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();
      setProductos(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <ProductoCard key={producto.idProducto} producto={producto} />
      ))}
    </div>
  );
};

const ProductoCard = ({ producto }) => {
  const [modeloSeleccionado, setModeloSeleccionado] = useState(0);

  const modeloActual = producto.modelos[modeloSeleccionado];
  const imagenActual = modeloActual.imagenes[0]?.urlImagen || '/placeholder.jpg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105">
      {/* Imagen del producto */}
      <div className="h-56 bg-gray-100 relative overflow-hidden">
        <img
          src={`${API_BASE_URL}/storage/${imagenActual}`}
          alt={modeloActual.nombreModelo}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido del producto */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{producto.nombreProducto}</h3>
        <p className="text-sm text-gray-600 mb-4">{producto.descripcion}</p>

        {/* Selector de modelos */}
        <div className="flex gap-2 mb-4">
          {producto.modelos.map((modelo, index) => (
            <button
              key={modelo.idModelo}
              onClick={() => setModeloSeleccionado(index)}
              className={`px-3 py-1 text-sm rounded-full ${
                modeloSeleccionado === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {modelo.nombreModelo}
            </button>
          ))}
        </div>

        {/* Categoría */}
        <p className="text-sm text-gray-500">
          Categoría: {producto.nombreCategoria}
        </p>
      </div>
    </div>
  );
};

export default ProductosCatalogo;