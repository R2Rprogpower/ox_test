import React from 'react';
import ReactDOM from 'react-dom';
import '../Popup.css';

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-button" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
