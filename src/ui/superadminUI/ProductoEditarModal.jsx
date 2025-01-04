import React, { useState } from 'react';
import { X, Pencil, Package } from 'lucide-react';
import EditarModelo from './EditarModelo';

const ProductoEditarModal = ({ producto, onClose }) => {
  const [modelos, setModelos] = useState(producto?.modelos || []);
  const [selectedModelo, setSelectedModelo] = useState(null);

  if (!producto) return null;

  const handleModeloClose = () => {
    setSelectedModelo(null);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="border-b p-4 flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">
                {producto?.nombreProducto}
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
            {/* Product Details */}
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Descripción</h3>
                <p className="text-gray-700">{producto?.descripcion}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {producto?.nombreCategoria}
                </span>
              </div>
            </div>

            {/* Models Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Modelos</h3>
              <div className="border rounded-md p-4 overflow-y-auto max-h-[300px]">
                <div className="space-y-2">
                  {modelos.map((modelo) => (
                    <div
                      key={modelo.idModelo}
                      className={`p-4 rounded-lg border transition-all cursor-pointer
                        ${selectedModelo?.idModelo === modelo.idModelo
                          ? 'bg-blue-50 border-blue-200'
                          : 'hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">
                          {modelo.nombreModelo}
                        </span>
                        <button
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-2"
                          onClick={() => setSelectedModelo(modelo)}
                        >
                          <Pencil className="h-4 w-4" />
                          Editar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
              >
                <X className="h-4 w-4" />
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EditarModelo Modal */}
      {selectedModelo && (
        <EditarModelo 
          modelo={selectedModelo} 
          onClose={handleModeloClose}
        />
      )}
    </>
  );
};

export default ProductoEditarModal;