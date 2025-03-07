// Dashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/superAdminComponents/SidebarSuperAdmin';
import API_BASE_URL from '../../js/urlHelper';
import LoaderScreen from '../../components/home/LoadingScreen';
import jwtUtils from '../../utilities/jwtUtils';
import EstadoUsuarios from '../../components/superAdminComponents/Estadousuarios';
import Logs from '../../components/superAdminComponents/Log';
import ErrorLog from '../../components/superAdminComponents/Errorlog';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = jwtUtils.getTokenFromCookie();
      try {
        const response = await fetch(`${API_BASE_URL}/api/obtenerInfoAdmins`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) throw new Error('Error fetching stats');
        const data = await response.json();
        setStats(data.stats);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          <div className="space-y-8">
            <EstadoUsuarios stats={stats} />
            <ErrorLog />
            <Logs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;