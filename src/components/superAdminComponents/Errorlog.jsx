import React, { useState, useEffect } from 'react';

const ErrorLog = ({ initialError }) => {
  const [errors, setErrors] = useState([]);
  const [filter, setFilter] = useState('all');

  // Efecto para agregar errores iniciales o nuevos
  useEffect(() => {
    if (initialError) {
      setErrors(prevErrors => {
        // Evitar duplicados
        if (!prevErrors.some(e => e.timestamp === initialError.timestamp)) {
          return [...prevErrors, initialError];
        }
        return prevErrors;
      });
    }
  }, [initialError]);

  // Capturar errores globales
  useEffect(() => {
    const handleGlobalError = (event) => {
      const newError = {
        message: event.error?.message || 'Error desconocido',
        severity: 'critical',
        location: event.filename || 'Unknown location',
        timestamp: new Date().toISOString(),
        stack: event.error?.stack,
        user: 'Usuario actual'
      };

      setErrors(prevErrors => [...prevErrors, newError]);
    };

    // Capturar errores de promesas no manejadas
    const handleUnhandledRejection = (event) => {
      const newError = {
        message: event.reason?.message || 'Promise rejection no manejada',
        severity: 'warning',
        location: 'Promise rejection',
        timestamp: new Date().toISOString(),
        stack: event.reason?.stack,
        user: 'Usuario actual'
      };

      setErrors(prevErrors => [...prevErrors, newError]);
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredErrors = errors.filter(error => {
    if (filter === 'all') return true;
    return error.severity.toLowerCase() === filter;
  });

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Log de Errores</h2>
        <div className="flex gap-2">
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todos los errores</option>
            <option value="critical">Críticos</option>
            <option value="warning">Advertencias</option>
            <option value="info">Información</option>
          </select>
          <button
            onClick={clearErrors}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Limpiar
          </button>
        </div>
      </div>

      {filteredErrors.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No se encontraron errores
        </div>
      ) : (
        <div className="space-y-4">
          {filteredErrors.map((error, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getSeverityColor(error.severity)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">{error.message}</span>
                <span className="text-sm">{formatDate(error.timestamp)}</span>
              </div>
              <div className="text-sm">
                <p><span className="font-medium">Ubicación:</span> {error.location}</p>
                <p><span className="font-medium">Usuario:</span> {error.user || 'No registrado'}</p>
                {error.stack && (
                  <pre className="mt-2 p-2 bg-white bg-opacity-50 rounded overflow-x-auto text-xs">
                    {error.stack}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Total de errores: {filteredErrors.length}
      </div>
    </div>
  );
};

export default ErrorLog;