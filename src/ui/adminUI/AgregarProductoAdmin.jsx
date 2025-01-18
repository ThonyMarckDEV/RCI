import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/adminComponents/SidebarAdmin';
import SweetAlert from '../../components/SweetAlert';
import LoaderScreen from '../../components/home/LoadingScreen';
import API_BASE_URL from '../../js/urlHelper';
import { Upload, X } from 'lucide-react';
import jwtUtils from '../../utilities/jwtUtils';
import { verificarYRenovarToken } from '../../js/authToken';

function AgregarProductoAdmin() {
  const initialProductState = {
    idProducto: '',
    nombreProducto: '',
    descripcion: '',
    estado: 'activo',
    idCategoria: '',
    precio: '',
  };

  const initialModeloState = {
    idModelo: '',
    nombreModelo: '',
    imagenes: [],
  };

  const [producto, setProducto] = useState(initialProductState);
  const [modelos, setModelos] = useState([initialModeloState]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([[]]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caracteristicas, setCaracteristicas] = useState('');

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Reemplazar las funciones de manejo de características con una simple función:
  const handleCaracteristicasChange = (e) => {
    setCaracteristicas(e.target.value);
  };

  const cargarCategorias = async () => {
    const token = jwtUtils.getTokenFromCookie();
    await verificarYRenovarToken();
    try {
      const response = await fetch(`${API_BASE_URL}/api/categoriasproductos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al cargar categorías');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      SweetAlert.showMessageAlert('Error', 'Error al cargar categorías', 'error');
    }
  };


  const agregarNuevoModelo = () => {
    const newIndex = modelos.length;
    setModelos((prev) => [...prev, initialModeloState]);
    setSelectedFiles((prev) => [...prev, []]);
  };

  const eliminarModelo = (index) => {
    setModelos((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };


    // Modificar la función resetForm para incluir las características:
  const resetForm = () => {
    setProducto(initialProductState);
    setModelos([initialModeloState]);
    setSelectedFiles([[]]);
    setCaracteristicas('');
    
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ''));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleModeloChange = (index, e) => {
    const { name, value } = e.target;
    setModelos((prev) =>
      prev.map((modelo, i) =>
        i === index ? { ...modelo, [name]: value } : modelo
      )
    );
  };

  const handleImagenChange = (modeloIndex, e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newSelectedFiles = [...selectedFiles];
      const newModelos = [...modelos];

      files.forEach((file) => {
        if (!file.type.startsWith('image/')) {
          SweetAlert.showMessageAlert(
            'Error',
            'Por favor seleccione un archivo de imagen válido',
            'error'
          );
          e.target.value = '';
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          SweetAlert.showMessageAlert(
            'Error',
            'El archivo no debe exceder los 5 MB',
            'error'
          );
          e.target.value = '';
          return;
        }

        const fileUrl = URL.createObjectURL(file);
        newSelectedFiles[modeloIndex].push(fileUrl);
        newModelos[modeloIndex].imagenes.push(file);
      });

      setSelectedFiles(newSelectedFiles);
      setModelos(newModelos);
    }
  };

  const handleDrop = (modeloIndex, e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const newSelectedFiles = [...selectedFiles];
      const newModelos = [...modelos];

      files.forEach((file) => {
        if (!file.type.startsWith('image/')) {
          SweetAlert.showMessageAlert(
            'Error',
            'Por favor seleccione un archivo de imagen válido',
            'error'
          );
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          SweetAlert.showMessageAlert(
            'Error',
            'El archivo no debe exceder los 5 MB',
            'error'
          );
          return;
        }

        const fileUrl = URL.createObjectURL(file);
        newSelectedFiles[modeloIndex].push(fileUrl);
        newModelos[modeloIndex].imagenes.push(file);
      });

      setSelectedFiles(newSelectedFiles);
      setModelos(newModelos);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const eliminarImagen = (modeloIndex, imagenIndex) => {
    const newSelectedFiles = [...selectedFiles];
    const newModelos = [...modelos];

    newSelectedFiles[modeloIndex].splice(imagenIndex, 1);
    newModelos[modeloIndex].imagenes.splice(imagenIndex, 1);

    setSelectedFiles(newSelectedFiles);
    setModelos(newModelos);
  };

  const validateForm = () => {
    if (!producto.nombreProducto.trim()) {
      SweetAlert.showMessageAlert(
        'Error',
        'El nombre del producto es obligatorio',
        'error'
      );
      return false;
    }

    if (!producto.idCategoria) {
      SweetAlert.showMessageAlert(
        'Error',
        'Debe seleccionar una categoría',
        'error'
      );
      return false;
    }

    if (!producto.precio || producto.precio <= 0) {
      SweetAlert.showMessageAlert(
        'Error',
        'El precio debe ser mayor a 0',
        'error'
      );
      return false;
    }

    if (modelos.length === 0) {
      SweetAlert.showMessageAlert(
        'Error',
        'Debe agregar al menos un modelo',
        'error'
      );
      return false;
    }

    for (let i = 0; i < modelos.length; i++) {
      if (!modelos[i].nombreModelo.trim()) {
        SweetAlert.showMessageAlert(
          'Error',
          `El nombre del modelo ${i + 1} es obligatorio`,
          'error'
        );
        return false;
      }

      if (modelos[i].imagenes.length === 0) {
        SweetAlert.showMessageAlert(
          'Error',
          `Debe seleccionar al menos una imagen para el modelo ${i + 1}`,
          'error'
        );
        return false;
      }

    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('nombreProducto', producto.nombreProducto.trim());
    formData.append('descripcion', producto.descripcion.trim());
    formData.append('estado', producto.estado);
    formData.append('idCategoria', producto.idCategoria);
    formData.append('precio', producto.precio);

  // Agregar características al FormData
    if (caracteristicas.trim()) {
      formData.append('caracteristicas', caracteristicas.trim());
    }
  
    modelos.forEach((modelo, index) => {
      formData.append(`modelos[${index}][nombreModelo]`, modelo.nombreModelo.trim());
      modelo.imagenes.forEach((imagen, imagenIndex) => {
        formData.append(`modelos[${index}][imagenes][${imagenIndex}]`, imagen);
      });
  
    });
  
    await verificarYRenovarToken();
  
    try {
      const token = jwtUtils.getTokenFromCookie();
      const response = await fetch(`${API_BASE_URL}/api/agregarProductos`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Captura la respuesta como JSON
        if (response.status === 409) {
          // Si el error es 409, muestra el mensaje de error en SweetAlert
          SweetAlert.showMessageAlert('Error', errorData.message, 'error');
          return; // Detiene la ejecución
        }
        throw new Error('Error en la respuesta del servidor');
      }
  
      const data = await response.json();
  
      SweetAlert.showMessageAlert(
        'Éxito',
        'Producto agregado correctamente',
        'success'
      );
      resetForm(); // Limpia el formulario después de agregar el producto
    } catch (error) {
      console.error('Error en la respuesta del servidor:', error.message);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Agregar Producto</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Campos del producto */}
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
                <label className="text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={producto.precio}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Ingrese el precio del producto"
                  min="0"
                  step="0.01"
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
                  {categorias.map((categoria) => (
                    <option key={categoria.idCategoria} value={categoria.idCategoria}>
                      {categoria.nombreCategoria}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Descripción (Opcional) (Max. 60 Caracteres)
                </label>
                <textarea
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  rows="4"
                  placeholder="Descripción detallada del producto"
                  maxLength={60}
                />
                <div className="text-right text-xs text-gray-500">
                  {producto.descripcion.length}/60 caracteres
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Características del Producto (Opcional)
              </h2>
              <div className="space-y-2">
                <textarea
                  placeholder="Ingrese las características del producto"
                  value={caracteristicas}
                  onChange={handleCaracteristicasChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  rows="4"
                />
                <p className="text-sm text-gray-500">
                  Ingrese las características del producto. Si no se especifica ninguna, se guardará como "Sin características disponibles". (Texto sin límite de caracteres)
                </p>
              </div>

            </div>

            {/* Modelos del producto */}
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
                        <label className="text-sm font-medium text-gray-700">Imágenes del Modelo</label>
                        <div
                          className="relative"
                          onDrop={(e) => handleDrop(index, e)}
                          onDragOver={handleDragOver}
                        >
                          <input
                            type="file"
                            name="imagenes"
                            onChange={(e) => handleImagenChange(index, e)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id={`imagenes-${index}`}
                            accept=".jpeg, .jpg, .png, .avif, .webp"
                            multiple
                          />
                          <div
                            className={`flex items-center justify-center w-full p-3 border-2 border-dashed 
                              ${selectedFiles[index].length > 0 ? 'border-green-500' : 'border-gray-300'} 
                              rounded-lg cursor-pointer hover:border-blue-500 transition`}
                          >
                            {selectedFiles[index].length > 0 ? (
                              <div className="relative w-full">
                                <div className="grid grid-cols-3 gap-4">
                                  {selectedFiles[index].map((fileUrl, imagenIndex) => (
                                    <div key={imagenIndex} className="relative">
                                      <img
                                        src={fileUrl}
                                        alt="Preview"
                                        className="h-32 w-full object-cover rounded"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => eliminarImagen(index, imagenIndex)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                                <span className="mt-2 block text-sm text-center text-green-600">
                                  Imágenes seleccionadas - Click para cambiar
                                </span>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <span className="mt-2 block text-sm text-gray-600">
                                  Arrastra y suelta imágenes o haz clic para seleccionar
                                </span>
                                <span className="block text-xs text-gray-500">
                                  Formatos permitidos: .jpeg, .jpg, .png, .avif, .webp (Max. 5 MB)
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
              className="w-full p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition font-medium"
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