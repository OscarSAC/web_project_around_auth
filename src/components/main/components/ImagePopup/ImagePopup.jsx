 import Popup from '../Popup/Popup';
 
 export default function ImagePopup({ isOpen=isOpen, onClose, imageUrl }) {
   return (
     <Popup isOpen={isOpen}  onClose={onClose} isImagePopup={true}>
          <img className="image-popup__image" 
          src={imageUrl} alt="Imagen ampliada" />
        </Popup>
   );
 }
 
 