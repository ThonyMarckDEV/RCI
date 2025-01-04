import React, { useState } from 'react';
import Modal from 'react-modal';
import SweetAlert from '../../components/SweetAlert';
import API_BASE_URL from '../../js/urlHelper';

Modal.setAppElement('#root');

function EditarModelo({ modelo, onClose }) {
  const [nombreModelo, setNombreModelo] = useState(modelo.nombreModelo);
  const [descripcion, setDescripcion] = useState(modelo.descripcion);
  const [imagen, setImagen] = useState(modelo.imagenes[0]?.urlImagen);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_BASE_URL}/api/editarModelo/${modelo.idModelo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombreModelo,
          descripcion,
          imagen
        })
      });

      if (!response.ok) throw new Error('Error al guardar los cambios');

      SweetAlert.showMessageAlert('Éxito', 'Modelo actualizado correctamente', 'success');
      onClose();
    } catch (error) {
      SweetAlert.showMessageAlert('Error', 'Error al guardar los cambios', 'error');
    }
  };

  return (
    <Modal isOpen={!!modelo} onRequestClose={onClose} contentLabel="Editar Modelo">
      <h2>Editar Modelo: {modelo.nombreModelo}</h2>

      <label>
        Nombre del Modelo:
        <input type="text" value={nombreModelo} onChange={(e) => setNombreModelo(e.target.value)} />
      </label>

      <label>
        Descripción:
        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </label>

      <label>
        Imagen:
        <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
      </label>

      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cerrar</button>
    </Modal>
  );
}

export default EditarModelo;