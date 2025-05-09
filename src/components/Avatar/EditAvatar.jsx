import Popup from '../main/components/Popup/Popup';

export default function EditAvatarPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Popup title="Cambiar foto de perfil" onClose={onClose}>
      <label className="popup__label" id="profile-picture">
        <input
          type="url"
          name="profile-picture"
          id="profile-picture"
          className="popup__input"
          placeholder="URL de la imagen"
          required
        />
        <span className="popup__input-error" id="profile-picture-error"></span>
      </label>
    </Popup>
  );
}