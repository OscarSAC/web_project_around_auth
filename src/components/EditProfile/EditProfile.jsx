import Popup from '../main/components/Popup/Popup';

export default function EditProfilePopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Popup title="Editar Perfil" onClose={onClose}>
           <label className="popup__label" id="profile-name">
              <input
                type="text"
                className="popup__input"
                placeholder="Nombre"
                name="name-text"
                id="name-text"
                minLength="2"
                maxLength="40"
                required 
              />
              <span className="popup__input-error" id="name-text-error"></span>
            </label>

            <label className="popup__label" id="description">
              <input
                type="text"
                className="popup__input"
                placeholder="Acerca de mí"
                name="profile-description"
                id="profile-description"
                minLength="2"
                maxLength="200"
                required
              />
              <span
                className="popup__input-error"
                id="profile-description-error"
              ></span>
           </label>
          </Popup>
  );
}