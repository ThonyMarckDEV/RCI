import Sidebar from '../../components/adminComponents/SidebarAdmin';
import ProductTableAdmin from '../../components/adminComponents/ProductTableAdmin';

function EditarProductoAdmin() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-yellow-500">Lista de Categorias</h2>
        <div className="overflow-x-auto">
          <ProductTableAdmin />
        </div>
      </div>

    </div>
  );
}

export default EditarProductoAdmin;
