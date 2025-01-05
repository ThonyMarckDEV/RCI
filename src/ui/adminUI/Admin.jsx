import React from 'react';
import Sidebar from '../../components/adminComponents/SidebarAdmin';

const Admin = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 p-4">
        {/* Contenido principal aquí */}
      </main>
    </div>
  );
};

export default Admin;