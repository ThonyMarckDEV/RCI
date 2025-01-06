// DashboardStats.js
import React from 'react';
import { Users, UserCheck, UserX } from 'lucide-react';

const EstadoUsuarios = ({ stats }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>
    
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Administradores</h3>
            <Users className="h-5 w-5 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats?.total_users}</div>
          <p className="text-xs text-gray-500 mt-1">Administradores Registrados</p>
        </div>

        {/* Active Users Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Administradores Activos</h3>
            <UserCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-500">{stats?.active_users}</div>
          <p className="text-xs text-gray-500 mt-1">Administradores Activos Ahora</p>
        </div>

        {/* Inactive Users Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Administradores Inactivos</h3>
            <UserX className="h-5 w-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-red-500">{stats?.inactive_users}</div>
          <p className="text-xs text-gray-500 mt-1">Administradores Inactivos Ahora</p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Distribucion del estado de Administradores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Active Users Stats */}
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">Administradores Activos</p>
                <h4 className="text-2xl font-bold text-emerald-700 mt-2">
                  {stats?.active_users}
                </h4>
              </div>
              <div className="text-emerald-500">
                {stats?.total_users && (
                  <p className="text-lg font-semibold">
                    {((stats.active_users / stats.total_users) * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Inactive Users Stats */}
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Administradores Inactivos</p>
                <h4 className="text-2xl font-bold text-red-700 mt-2">
                  {stats?.inactive_users}
                </h4>
              </div>
              <div className="text-red-500">
                {stats?.total_users && (
                  <p className="text-lg font-semibold">
                    {((stats.inactive_users / stats.total_users) * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="md:col-span-2 mt-4">
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ 
                  width: `${stats?.total_users ? (stats.active_users / stats.total_users) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadoUsuarios;