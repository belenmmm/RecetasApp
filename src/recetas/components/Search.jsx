import React, { useState } from "react";

export const Search = ({ onSearch, onClearSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm(""); // Limpiar el término de búsqueda
    onClearSearch(); // Restaurar todas las recetas originales
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar recetas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={handleClear}>Volver</button>
     
    </div>
  );
};