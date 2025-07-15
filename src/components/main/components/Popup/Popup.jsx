
import closeIcon from '../../../../images/Close_Icon.svg';
import '../../../../blocks/popup.css'
import { useEffect, useCallback } from 'react';


export default function Popup(props) {
    const {
      title, 
      children, 
      onClose, 
      isImagePopup = false, 
      onSubmit, 
      isValid = true,
      isForm= true, 
      isOpen= false
    } = props;
  
  
    
    const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
      onClose();
      }
    };

    const handleEscClose = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
      }
    }, [onClose]);

    useEffect(() => {
      document.addEventListener('keydown', handleEscClose);
      return () => {
      document.removeEventListener('keydown', handleEscClose);
      };
    }, [handleEscClose]);
   
    return (
        
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
        <div className={`popup__container ${isImagePopup ? 'image-popup__container' : ''}`}>
          <button 
          className="popup__close-button" 
          id="popup__close-button" 
          onClick={onClose}>
            <img src={closeIcon} 
            alt="Cerrar ventana"/>
          </button>
          
          {isImagePopup ? (
            children
          ) : isForm ? (       
          <form className="popup__form" onSubmit={e => {e.preventDefault();
            if (onSubmit) onSubmit(e);
          }}>
            <h3 className="popup__container-title">{title}</h3>
            {children}
            
            <button type="submit" 
            className={`popup__button ${(!isValid || props.isSubmitting) ? 'popup__button_disabled' : ''}`} 
            id="save-button" 
            disabled={!isValid || props.isSubmitting}>
            {props.buttonText || 'Guardar'}
            </button>
          </form>
    ) : (
      <div className="popup__content">
            {children}
          </div>
    )}
        </div>
      </div>
    )
  }