
import closeIcon from '../../../../images/Close_Icon.svg';

export default function Popup(props) {
    //los hijos son el contenido de la ventana emergente
    const {title, children, onClose, buttonText, isImagePopup = false } = props;
    return (
        <div className="popup" id="popup">
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
          ) : (       
          <form className="popup__form">
            <h3 className="popup__container-title">{title}</h3>
            {children}
            
            <button type="submit" className="popup__button" id="save-button">
            {props.buttonText || 'Guardar'}
            </button>
          </form>
    )}
        </div>
      </div>
    )
  }