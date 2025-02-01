import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowUpDown, Tag, Trash2, ChevronDown } from 'lucide-react';

const CatalogoSearch = ({ onSearch, onSort, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const searchRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowRecent(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);

      // Guardar la búsqueda reciente solo cuando se presiona Enter o se hace clic en el botón de búsqueda
      const updatedSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
    setShowRecent(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const removeRecentSearch = (searchToRemove, e) => {
    e.stopPropagation(); // Evita que se active el clic del botón padre
    const updatedSearches = recentSearches.filter(term => term !== searchToRemove);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    onSort(order);
    setShowSortDropdown(false);

    const updatedFilters = activeFilters.filter(f => !f.startsWith('Ordenar:'));
    setActiveFilters(updatedFilters);

    if (order) {
      addFilter(`Ordenar: ${order === 'asc' ? 'A-Z' : 'Z-A'}`);
    }
  };

  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter) => {
    const updatedFilters = activeFilters.filter(f => f !== filter);
    setActiveFilters(updatedFilters);

    if (filter.startsWith('Ordenar:')) {
      setSortOrder('');
      onSort('');
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <div className="flex gap-2">
        <div className="relative flex-grow" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowRecent(true)}
              placeholder="Buscar productos..."
              className="w-full px-4 py-3 pl-12 pr-20 rounded-lg border border-gray-200 0 transition-all duration-200"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute left-4 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <Search size={20} />
            </button>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {showRecent && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100">
              <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Búsquedas recientes</span>
                {recentSearches.length > 0 && (
                  <button
                    onClick={clearRecentSearches}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Limpiar
                  </button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <div className="p-2">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(term); // Actualiza el término de búsqueda
                        handleSearchSubmit(); // Ejecuta la búsqueda
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center gap-2 text-gray-700 group relative"
                    >
                      <Clock size={14} className="text-gray-400" />
                      {term}
                      <button
                        onClick={(e) => removeRecentSearch(term, e)}
                        className="absolute right-2 opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No hay búsquedas recientes
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm flex items-center gap-1"
            >
              <Tag size={14} />
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="ml-1 text-yellow-800 hover:text-yellow-900"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogoSearch;