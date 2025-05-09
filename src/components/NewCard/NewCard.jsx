import Popup from '../main/components/Popup/Popup';

export default function newCardPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
     <Popup title="Nuevo Lugar" onClose={onClose} buttonText="Crear">          
              <label className="popup__label" id="place-name">
                <input
                  type="text"
                  name="place-name-text"
                  className="popup__input"
                  placeholder="Título"
                  id="place-name-text"
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="popup__input-error" id="place-name-text-error"></span>
              </label>

              <label className="popup__label" id="img-url">
                <input
                  type="url"
                  name="img-url"
                  className="popup__input"
                  placeholder="Enlace a la imagen"
                  id="img-url"
                  required
                />
                <span className="popup__input-error" id="img-url-error"></span>
              </label>
          </Popup>
  );
}
