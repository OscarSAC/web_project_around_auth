import Popup from '../Popup/Popup';
import React, {useState, useEffect} from 'react';
import '../../../../blocks/popup.css';


export default function NewCard ({ isOpen, onClose, onNewCard }) {
  const [placeName, setPlaceName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched]= useState({});

  

  
   useEffect(() => {
    if (isOpen) {
      setPlaceName('');
      setImageUrl('');
      setErrors({});
      setIsValid(false);
    }
  }, [isOpen]);

    

  const validate = () => {
    const newErrors = {};
    if (!placeName || placeName.length < 2 || placeName.length > 30) {
      newErrors.placeName = 'Debe tener entre 2 y 30 caracteres.';
    }
    if (!imageUrl || !/^https?:\/\/.+\..+/.test(imageUrl)) {
      newErrors.imageUrl = 'Debe ser una URL válida.';
    }
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validate();
  }, [placeName, imageUrl]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    if (!isValid) return;

    setIsSubmitting(true);
    await onNewCard({ name: placeName, link: imageUrl });
    setIsSubmitting(false);
  };

  const isFieldErrorVisible = (fieldName, value) => {
    return (touched[fieldName] || value !== '') && errors[fieldName];
  };

  // if (!isOpen) return null;
  return (
     <Popup isOpen={isOpen} title="Nuevo Lugar" onClose={onClose} buttonText={isSubmitting? "Creando..." : "Crear"} onSubmit={handleSubmit} isValid={isValid}>          
              <label className="popup__label" id="place-name">
                <input
                  type="text"
                  name="place-name-text"
                  className={`popup__input ${isFieldErrorVisible('placeName', placeName) ? 'popup__input_type_error' : ''}`}
                  placeholder="Título"
                  id="place-name-text"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  onBlur={()=> handleBlur('placeName')}
                />
                <span className={`popup__input-error ${isFieldErrorVisible('placeName', placeName) ? 'popup__error_visible' : ''}`} 
                id="place-name-text-error">
            {errors.placeName}
          </span>
              </label>

              <label className="popup__label" id="img-url">
                <input
                  type="url"
                  name="img-url"
                  className={`popup__input ${isFieldErrorVisible('imageUrl', imageUrl) ? 'popup__input_type_error' : ''}`}
                  placeholder="Enlace a la imagen"
                  id="img-url"                 
                  value ={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onBlur={()=> handleBlur('imageUrl')}
                />
                <span className={`popup__input-error ${isFieldErrorVisible('imageUrl', imageUrl) ? 'popup__error_visible' : ''}`} id="img-url-error">
            {errors.imageUrl}
          </span>
              </label>
          </Popup>
  );
}
