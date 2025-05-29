import Popup from '../main/components/Popup/Popup';
import {useRef, useEffect, useState} from 'react';
import '../../blocks/popup.css';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  if (!isOpen) return null;

  const avatarRef = useRef();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
    if (isOpen) {
      avatarRef.current.value ='';
      setErrors({});
      setTouched({});
      setIsValid(false);
    }
  }, [isOpen]);

  const validate = () => {
    const value = avatarRef.current.value;
    const newErrors = {};

    if (!value || !/^https?:\/\/.+\..+/.test(value.trim())) {
      newErrors.avatar = 'Debe ser una URL válida.';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    if (!touched.avatar) {
      setTouched((prev) => ({ ...prev, avatar: true }));
    }

    validate();
  };

  const handleBlur = () => {
    setTouched((prev) => ({ ...prev, avatar: true }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    if (!isValid) return;

    setIsSubmitting(true);
    await onUpdateAvatar({
      avatar: avatarRef.current.value
      });
    setIsSubmitting(false);
}
  return (
    <Popup title="Cambiar foto de perfil" onClose={onClose} onSubmit={handleSubmit} isValid={isValid} buttonText={isSubmitting ? 'Cambiando Avatar...' : 'Cambiar'} isSubmitting={isSubmitting}>
      <label className="popup__label" id="profile-picture">
        <input
          type="url"
          name="profile-picture"
          id="profile-picture"
          className={`popup__input ${errors.avatar && touched.avatar ? 'popup__input_type_error' : ''}`}
          placeholder="URL de la imagen"
          // required
          ref={avatarRef}
          onChange={handleChange}
          onBlur={handleBlur}
        />
         <span
          className={`popup__input-error ${errors.avatar && touched.avatar ? 'popup__error_visible' : ''}`}
          id="profile-picture-error"
        >{errors.avatar}</span>
      </label>
    </Popup>
  );
}