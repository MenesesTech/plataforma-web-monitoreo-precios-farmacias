import React, { useState } from "react";
import { Bell, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleClick}>
      <div className="rounded-md flex items-center justify-center mr-2">
        <div className="w-5 h-5 bg-white rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(19,167,178,1)"
          >
            <path d="M21 20H23V22H1V20H3V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V20ZM11 8H9V10H11V12H13V10H15V8H13V6H11V8ZM14 20H16V14H8V20H10V16H14V20Z"></path>
          </svg>
        </div>
      </div>
      <span className="text-xl font-semibold text-hero_dark">MedicPrice</span>
    </div>
  );
};

const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const buscarProducto = () => {
    if (input.trim()) {
      navigate(`/buscar/producto/${input}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      buscarProducto();
    }
  };

  return (
    <div className="flex-1 max-w-md mx-8">
      <div className="relative flex items-center w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Buscar medicamentos, pastillas, jarabes..."
          className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-700 dark:text-gray-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 p-1 text-hero_dark hover:text-[#117f88] dark:hover:text-[#7bdde5]"
          onClick={buscarProducto}
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const HeaderIcons = () => (
  <div className="flex items-center space-x-3">
    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full bg-gray-100 dark:bg-gray-800">
      <Bell className="w-4 h-4" />
    </button>
    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full bg-gray-100 dark:bg-gray-800">
      <User className="w-4 h-4" />
    </button>
  </div>
);

export const Header = ({ onToggleTheme, darkMode }) => {
  return (
    <header className="sticky top-3 z-30 bg-theme border-1 border-hero_dark shadow-lg shadow-cyan-500/50 rounded-xl mx-9 px-6 py-2 h-16 flex items-center">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-4">
        <Logo />
        <div className="flex-1 max-w-md w-full">
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4">
          {/* <ThemeToggle onToggle={onToggleTheme} darkMode={darkMode} /> */}
          <HeaderIcons />
        </div>
      </div>
    </header>
  );
};
