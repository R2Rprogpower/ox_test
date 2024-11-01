import React from 'react';
import ReactDOM from 'react-dom';

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-content">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
