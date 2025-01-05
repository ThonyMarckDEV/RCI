import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/adminComponents/SidebarAdmin';
import SweetAlert from '../../components/SweetAlert';
import LoaderScreen from '../../components/home/LoadingScreen';
import API_BASE_URL from '../../js/urlHelper';
import { Upload } from 'lucide-react';
import jwtUtils from '../../utilities/jwtUtils';

function AgregarProductoAdmin() {
  const initialProductState = {
    idProducto: '',
    nombreProducto: '',
    descripcion: '',
    estado: 'activo',
    idCategoria: ''
  };

  const initialModeloState = {
    idModelo: '',
    nombreModelo: '',
    imagen: null
  };

  const [producto, setProducto] = useState(initialProductState);
  const [modelos, setModelos] = useState([initialModeloState]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([null]);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    const token = jwtUtils.getTokenFromCookie();
    try {
      const response = await fetch(`${API_BASE_URL}/api/categoriasproductos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al cargar categorías');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      SweetAlert.showMessageAlert('Error', 'Error al cargar categorías', 'error');
    }
  };

  const resetForm = () => {
    setProducto(initialProductState);
    setModelos([initialModeloState]);
    setSelectedFiles([null]);
    // Reset all file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleModeloChange = (index, e) => {
    const { name, value } = e.target;
    setModelos(prev => prev.map((modelo, i) => 
      i === index ? { ...modelo, [name]: value } : modelo
    ));
  };

  const handleImagenChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        SweetAlert.showMessageAlert('Error', 'Por favor seleccione un archivo de imagen válido', 'error');
        e.target.value = ''; // Reset input
        return;
      }

      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = URL.createObjectURL(file);
      setSelectedFiles(newSelectedFiles);
      
      setModelos(prev => prev.map((modelo, i) => 
        i === index ? { ...modelo, imagen: file } : modelo
      ));
    }
  };

  const validateForm = () => {
    // Validate product fields
    if (!producto.nombreProducto.trim()) {
      SweetAlert.showMessageAlert('Error', 'El nombre del producto es obligatorio', 'error');
      return false;
    }

    if (!producto.idCategoria) {
      SweetAlert.showMessageAlert('Error', 'Debe seleccionar una categoría', 'error');
      return false;
    }

    // Validate models
    if (modelos.length === 0) {
      SweetAlert.showMessageAlert('Error', 'Debe agregar al menos un modelo', 'error');
      return false;
    }

    // Validate each model
    for (let i = 0; i < modelos.length; i++) {
      if (!modelos[i].nombreModelo.trim()) {
        SweetAlert.showMessageAlert('Error', `El nombre del modelo ${i + 1} es obligatorio`, 'error');
        return false;
      }

      if (!modelos[i].imagen) {
        SweetAlert.showMessageAlert('Error', `Debe seleccionar una imagen para el modelo ${i + 1}`, 'error');
        return false;
      }
    }

    return true;
  };

  const agregarNuevoModelo = () => {
    setModelos(prev => [...prev, initialModeloState]);
    setSelectedFiles(prev => [...prev, null]);
  };

  const eliminarModelo = (index) => {
    setModelos(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar el formulario antes de proceder
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('nombreProducto', producto.nombreProducto.trim());
    formData.append('descripcion', producto.descripcion.trim());
    formData.append('estado', producto.estado);
    formData.append('idCategoria', producto.idCategoria);
  
    modelos.forEach((modelo, index) => {
      formData.append(`modelos[${index}][nombreModelo]`, modelo.nombreModelo.trim());
      formData.append(`modelos[${index}][imagen]`, modelo.imagen);
    });
  
    try {
      const token = jwtUtils.getTokenFromCookie();
      const response = await fetch(`${API_BASE_URL}/api/agregarProductos`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json(); // Intenta parsear la respuesta como JSON
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al agregar el producto');
      }
      
      SweetAlert.showMessageAlert('Éxito', 'Producto agregado correctamente', 'success');
      resetForm();
    } catch (error) {
      console.error('Error en la respuesta del servidor:', error.message); // Imprime el error en la consola
      SweetAlert.showMessageAlert('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-yellow-500 mb-8">Agregar Producto</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nombre del Producto</label>
                <input
                  type="text"
                  name="nombreProducto"
                  value={producto.nombreProducto}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Ingrese el nombre del producto"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Categoría</label>
                <select
                  name="idCategoria"
                  value={producto.idCategoria}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map(categoria => (
                    <option key={categoria.idCategoria} value={categoria.idCategoria}>
                      {categoria.nombreCategoria}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Descripción (Opcional)</label>
                <textarea
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  rows="4"
                  placeholder="Descripción detallada del producto"
                />
              </div>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Modelos del Producto</h2>
              <div className="space-y-6">
                {modelos.map((modelo, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-800">Modelo {index + 1}</h3>
                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => eliminarModelo(index)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombre del Modelo</label>
                        <input
                          type="text"
                          name="nombreModelo"
                          value={modelo.nombreModelo}
                          onChange={(e) => handleModeloChange(index, e)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          placeholder="Nombre del modelo"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Imagen del Modelo</label>
                        <div className="relative">
                          <input
                            type="file"
                            name="imagen"
                            onChange={(e) => handleImagenChange(index, e)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id={`imagen-${index}`}
                            accept="image/*"
                          />
                          <div
                            className={`flex items-center justify-center w-full p-3 border-2 border-dashed 
                              ${selectedFiles[index] ? 'border-green-500' : 'border-gray-300'} 
                              rounded-lg cursor-pointer hover:border-blue-500 transition`}
                          >
                            {selectedFiles[index] ? (
                              <div className="relative w-full">
                                <img
                                  src={selectedFiles[index]}
                                  alt="Preview"
                                  className="h-32 mx-auto object-contain"
                                />
                                <span className="mt-2 block text-sm text-center text-green-600">
                                  Imagen seleccionada - Click para cambiar
                                </span>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <span className="mt-2 block text-sm text-gray-600">
                                  Click para seleccionar imagen
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={agregarNuevoModelo}
                  className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <Upload className="h-5 w-5" />
                  Agregar Nuevo Modelo
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium"
            >
              Agregar Producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AgregarProductoAdmin;