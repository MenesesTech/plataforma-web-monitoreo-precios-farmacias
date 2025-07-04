import React, { useState } from "react";
import { Bell, User, Search } from "lucide-react";

const Header = ({ onSearch, onLogin, onNotify }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Nombre */}
        <h1 className="text-2xl font-bold text-[#00ACC1]">MedicPrice</h1>

        {/* Buscador con botón lupa */}
        <div className="flex items-center w-full max-w-xl bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-2 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-[#00ACC1] p-2 hover:bg-[#0097A7] transition"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Iconos */}
        <div className="flex items-center gap-4">
          <button onClick={onNotify}>
            <Bell className="w-6 h-6 text-gray-600 hover:text-[#00ACC1]" />
          </button>
          <button onClick={onLogin}>
            <User className="w-6 h-6 text-gray-600 hover:text-[#00ACC1]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
