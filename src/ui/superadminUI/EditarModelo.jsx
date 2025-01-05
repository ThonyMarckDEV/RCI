import React, { useState, useCallback } from 'react';
import { X, Save, Image, Upload, Trash2, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import API_BASE_URL from '../../js/urlHelper';
import SweetAlert from '../../components/SweetAlert';
import LoadingScreen from '../../components/home/LoadingScreen';

function EditarModelo({ modelo, onClose }) {
  const [nombreModelo, setNombreModelo] = useState(modelo.nombreModelo);
  const [descripcion, setDescripcion] = useState(modelo.descripcion);
  const [loading, setLoading] = useState(false);
  const [changingEstado, setChangingEstado] = useState(false); // Define changingEstado
  // Asegurarnos de que todas las imágenes tengan un ID único
  const [imagenes, setImagenes] = useState(
    modelo.imagenes.map((imagen, index) => ({
      ...imagen,
      idImagen: imagen.idImagen || `temp-${index}`, // ID temporal si no existe
      newFile: null,
      objectUrl: null
    }))
  );
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880,
    multiple: true
  });

  const handleReplaceImage = (idImagen, file) => {
    if (!idImagen) {
      console.error('ID de imagen no definido');
      return;
    }

    setImagenes(prevImagenes => {
      return prevImagenes.map(img => {
        if (img.idImagen === idImagen) {
          // Revocar URL anterior si existe
          if (img.objectUrl) {
            URL.revokeObjectURL(img.objectUrl);
          }
          const objectUrl = URL.createObjectURL(file);
          return {
            ...img,
            newFile: file,
            objectUrl: objectUrl
          };
        }
        return img;
      });
    });
  };

  // Limpiar URLs al desmontar
  React.useEffect(() => {
    return () => {
      imagenes.forEach(img => {
        if (img.objectUrl) {
          URL.revokeObjectURL(img.objectUrl);
        }
      });
    };
  }, [imagenes]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const formData = new FormData();
    
      // Agregar datos básicos del modelo
      formData.append('nombreModelo', nombreModelo);
      formData.append('descripcion', descripcion || ''); // Asegúrate de que la descripción no sea undefined
    
      // Agregar nuevas imágenes adicionales
      files.forEach((file, index) => {
        formData.append(`nuevasImagenes[${index}]`, file);
      });
    
      // Agregar imágenes reemplazadas
      const imagenesReemplazadas = imagenes.filter(
        (img) => img.newFile && img.idImagen && !String(img.idImagen).startsWith('temp-') // Convertimos idImagen a string
      );
    
      imagenesReemplazadas.forEach((imagen, index) => {
        formData.append(`imagenesReemplazadas[${index}]`, imagen.newFile); // Archivo reemplazado
        formData.append(`idImagenesReemplazadas[${index}]`, imagen.idImagen); // ID de la imagen reemplazada
      });
    
     
      // Enviar la solicitud al servidor
      const response = await fetch(
        `${API_BASE_URL}/api/editarModeloyImagen/${modelo.idModelo}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
    
      if (!response.ok) throw new Error('Error al guardar los cambios');
    
      onClose();
      SweetAlert.showMessageAlert('Éxito', 'Modelo actualizado correctamente', 'success');
    
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      SweetAlert.showMessageAlert('Error', 'Error al guardar los cambios', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveImage = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // Eliminar imagen existente
  const handleRemoveExistingImage = async (idImagen) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_BASE_URL}/api/eliminarImagenModelo/${idImagen}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar la imagen');
      }

      setImagenes((prevImagenes) => prevImagenes.filter((img) => img.idImagen !== idImagen));
      SweetAlert.showMessageAlert('Éxito', 'Imagen eliminada correctamente', 'success');
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      SweetAlert.showMessageAlert('Error', 'No se pudo eliminar la imagen', 'error');
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        {/* Mostrar el LoadingScreen cuando loading o changingEstado sea true */}
        {(loading || changingEstado) && <LoadingScreen />}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex items-center gap-2">
            <Image className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">
              Editar Modelo: {modelo.nombreModelo}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-blue-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  {isDragActive ? 
                    'Suelta las imágenes aquí...' : 
                    'Arrastra imágenes aquí o haz clic para seleccionar'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Formatos permitidos: JPG, JPEG, PNG (máx. 5MB)
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                {/* Imágenes existentes */}
                {imagenes.map((imagen) => (
                  <div 
                    key={imagen.idImagen} // Ahora siempre tendrá un valor único
                    className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100"
                  >
                    <img 
                      src={imagen.objectUrl || (imagen.urlImagen ? `${API_BASE_URL}/storage/${imagen.urlImagen}` : '')}
                      alt={`Imagen ${imagen.idImagen}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 flex gap-2">
                      <input
                        id={`file-input-${imagen.idImagen}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleReplaceImage(imagen.idImagen, file);
                          }
                          e.target.value = '';
                        }}
                      />
                      {/* Botón para reemplazar imagen */}
                      <button
                        onClick={() => document.getElementById(`file-input-${imagen.idImagen}`).click()}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                      </button>

                      {/* Botón para eliminar imagen existente */}
                      <button
                        onClick={() => handleRemoveExistingImage(imagen.idImagen)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Nuevas imágenes */}
                {files.map((file, index) => (
                  <div 
                    key={`new-${index}-${file.name}`}
                    className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100"
                  >
                    <img 
                      src={URL.createObjectURL(file)}
                      alt={`Nueva imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Modelo
                </label>
                <input
                  type="text"
                  value={nombreModelo}
                  onChange={(e) => setNombreModelo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
            >
              <X className="h-4 w-4" />
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarModelo;
