import React from "react";
import "../components/allStyles/LoaderStyles.css"; // Your CSS file with spinner styles

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
