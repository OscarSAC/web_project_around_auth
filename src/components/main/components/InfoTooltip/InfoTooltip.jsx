import React from 'react';
import '../../../../blocks/InfoTooltip.css'; // crea luego este archivo para estilos

const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
  return (
    <div className={`tooltip ${isOpen ? 'tooltip_opened' : ''}`}>
      <div className="tooltip__container">
        <button className="tooltip__close" onClick={onClose}>&times;</button>
        <img
          src={isSuccess
            ? '/images/success-icon.svg'
            : '/images/error-icon.svg'}
          alt={isSuccess ? 'Éxito' : 'Error'}
          className="tooltip__icon"
        />
        <p className="tooltip__message">{message}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;