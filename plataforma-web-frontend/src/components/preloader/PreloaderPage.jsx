import "./css/Preloader.css";

export const Preloader = () => {
  return (
    <div className="preloader-overlay">
      <div className="preloader-content">
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
        <p className="preloader-text">Preparando datos...</p>
      </div>
    </div>
  );
};
