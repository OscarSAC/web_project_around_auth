 import Popup from '../main/components/Popup/Popup';
 
 export default function ImagePopup({ isOpen, onClose, imageUrl }) {
   return (
     <Popup onClose={onClose} isImagePopup={true}>
          <img className="image-popup__image" 
          src={imageUrl} alt="Imagen ampliada" />
        </Popup>
   );
 }
 
 