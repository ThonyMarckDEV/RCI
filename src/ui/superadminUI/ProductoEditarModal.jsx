import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import SweetAlert from '../../components/SweetAlert';
import API_BASE_URL from '../../js/urlHelper';
import EditarModelo from './EditarModelo';

Modal.setAppElement('#root');

function EditarProducto({ producto, onClose }) {
  const [modelos, setModelos] = useState([]);
  const [selectedModelo, setSelectedModelo] = useState(null);

  useEffect(() => {
    if (producto) {
      setModelos(producto.modelos);
    }
  }, [producto]);

  const handleModeloClick = (modelo) => {
    setSelectedModelo(modelo);
  };

  const handleCloseModal = () => {
    setSelectedModelo(null);
  };

  return (
    <Modal isOpen={!!producto} onRequestClose={onClose} contentLabel="Editar Producto">
      <h2>Editar Producto: {producto?.nombreProducto}</h2>
      <p>Descripción: {producto?.descripcion}</p>
      <p>Categoría: {producto?.nombreCategoria}</p>

      <h3>Modelos</h3>
      <ul>
        {modelos.map((modelo) => (
          <li key={modelo.idModelo} onClick={() => handleModeloClick(modelo)}>
            {modelo.nombreModelo}
          </li>
        ))}
      </ul>

      {selectedModelo && (
        <EditarModelo modelo={selectedModelo} onClose={handleCloseModal} />
      )}

      <button onClick={onClose}>Cerrar</button>
    </Modal>
  );
}

export default EditarProducto;