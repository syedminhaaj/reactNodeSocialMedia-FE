// Popup.js
import React from "react";
import { Link } from "react-router-dom";
import "./allStyles/DailogPopup.css";

const DailogPopup = ({ message, link, onClose, buttonText }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
        <Link to={link} rel="noopener noreferrer">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default DailogPopup;
