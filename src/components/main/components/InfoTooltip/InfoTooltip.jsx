import React from 'react';
// import '../../../../blocks/InfoTooltip.css'; // crea luego este archivo para estilos
import successImage from '../../../../images/success.jpg';
import failImage from '../../../../images/Fail.jpg';
import '../../../../blocks/popup.css';
import Popup from '../Popup/Popup';


const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} isForm={false}>
      <div className="popup__tooltip">
        <img
          src={isSuccess ? successImage : failImage}
          alt={isSuccess ? 'Éxito' : 'Error'}
          className="popup__tooltip-icon"
        />
        <p className="popup__tooltip-text">{message}</p>
      </div>
    </Popup>
  );
};

export default InfoTooltip;