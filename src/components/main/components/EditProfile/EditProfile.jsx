import Popup from '../Popup/Popup';
import { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import '../../../../blocks/popup.css';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const {currentUser} = useContext(CurrentUserContext);
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 


 const handleNameChange = (event) => {
  setName(event.target.value);
   if (!touched.name) {
    setTouched((prev) => ({ ...prev, name: true }));
 };
};

 const handleDescriptionChange = (event) => {
  setDescription(event.target.value);
  if (!touched.description) {
    setTouched((prev) => ({ ...prev, description: true }));
  }
 };

 useEffect(() => {
  if (isOpen && currentUser?.name) {
    console.log("popup abierto user:", currentUser);
    setName(currentUser?.name || '');
    setDescription(currentUser?.about || '');
    setErrors({});
    setTouched({});
    setIsValid(false);
  }
}, [isOpen, currentUser]);

  const validate = () => {
    const newErrors = {};
    if (!name || name.trim().length < 2 || name.trim().length > 40) {
      newErrors.name = 'El nombre debe tener entre 2 y 40 caracteres.';
    }
    if (!description || description.trim().length < 2 || description.trim().length > 200) {
      newErrors.description = 'La descripción debe tener entre 2 y 200 caracteres.';
    }
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

   useEffect(() => {
    validate();
  }, [name, description]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    if (!isValid) return;

    setIsSubmitting(true);
    await onUpdateUser({ name, about: description });
    setIsSubmitting(false);
  };

  return (
    <Popup title="Editar Perfil" onClose={onClose} onSubmit={handleSubmit} isValid={isValid} buttonText={isSubmitting ? 'Guardando...' : 'Guardar'}>
           <label className="popup__label" id="profile-name">
              <input
                type="text"
                className={`popup__input ${errors.name && touched.name ? 'popup__input_type_error' : ''}`}
                placeholder="Nombre"
                name="name-text"
                id="name-text"
                value={name}
                onChange={handleNameChange}
                onBlur={() => handleBlur('name')}
              />
              <span
              className={`popup__input-error ${errors.name && touched.name ? 'popup__error_visible' : ''}`}
              id="name-text-error"
              >{errors.name}</span>
            </label>

            <label className="popup__label" id="description">
              <input
                type="text"
                className={`popup__input ${errors.description && touched.description ? 'popup__input_type_error' : ''}`}
                placeholder="Acerca de mí"
                name="profile-description"
                id="profile-description"
                value={description}
                onChange={handleDescriptionChange}
                onBlur={() => handleBlur('description')}
              />
              <span
                className={`popup__input-error ${errors.description && touched.description ? 'popup__error_visible' : ''}`}
                id="profile-description-error"
              >{errors.description}</span>
           </label>
          </Popup>
  );
}