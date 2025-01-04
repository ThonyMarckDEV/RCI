import React, { useState, useCallback } from 'react';
import { X, Save, Image, Upload, Trash2, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import API_BASE_URL from '../../js/urlHelper';
import SweetAlert from '../../components/SweetAlert';

function EditarModelo({ modelo, onClose }) {
  const [nombreModelo, setNombreModelo] = useState(modelo.nombreModelo);
  const [descripcion, setDescripcion] = useState(modelo.descripcion);
  const [imagen, setImagen] = useState(modelo.imagenes[0]?.urlImagen);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    modelo.imagenes[0]?.urlImagen ? `${API_BASE_URL}/storage/${modelo.imagenes[0].urlImagen}` : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const formData = new FormData();
      formData.append('nombreModelo', nombreModelo);
      formData.append('descripcion', descripcion);
      if (file) {
        formData.append('imagen', file);
      }

      const response = await fetch(`${API_BASE_URL}/api/editarModeloyImagen/${modelo.idModelo}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Error al guardar los cambios');

      SweetAlert.showMessageAlert('Éxito', 'Modelo actualizado correctamente', 'success');
      onClose();
    } catch (error) {
      SweetAlert.showMessageAlert('Error', 'Error al guardar los cambios', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);
    setImagen(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
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
            {/* Image Upload Area */}
            <div>
              {previewUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={previewUrl}
                    alt={nombreModelo}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    {isDragActive ? 
                      'Suelta la imagen aquí...' : 
                      'Arrastra una imagen aquí o haz clic para seleccionar'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Formatos permitidos: JPG, JPEG, PNG (máx. 5MB)
                  </p>
                </div>
              )}
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