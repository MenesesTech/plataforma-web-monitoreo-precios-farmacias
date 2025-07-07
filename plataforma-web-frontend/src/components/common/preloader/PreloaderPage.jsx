import "./css/Preloader.css";
import { useEffect, useState } from "react";

export const Preloader = ({ onFadeOut }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Inicia el fade-out antes de desmontar
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Esperar a que la transición termine (0.5s) y luego llamar callback
      setTimeout(() => {
        if (onFadeOut) onFadeOut();
      }, 500);
    }, 1000); // Tiempo visible

    return () => clearTimeout(timer);
  }, [onFadeOut]);

  return (
    <div className={`preloader-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  );
};
