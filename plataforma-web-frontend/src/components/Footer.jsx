import React from 'react';

const Footer = ({ onTerms, onPrivacy, onContact }) => {
  return (
    <footer className="bg-[#2E2C45] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Marca */}
        <div className="text-center md:text-left">
          <h4 className="text-xl font-bold">MedicPrice</h4>
          <p className="text-sm text-gray-300">Tu comparador de precios confiable</p>
        </div>

        {/* Enlaces */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <button
            id="footer-terms"
            onClick={onTerms}
            className="hover:underline text-gray-300"
          >
            Términos
          </button>
          <button
            id="footer-privacy"
            onClick={onPrivacy}
            className="hover:underline text-gray-300"
          >
            Privacidad
          </button>
          <button
            id="footer-contact"
            onClick={onContact}
            className="hover:underline text-gray-300"
          >
            Contacto
          </button>
        </div>
      </div>

      {/* Línea final */}
      <div className="mt-6 border-t border-gray-600 pt-4 text-center text-xs text-gray-400">
        © 2025 MedicPrice. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
