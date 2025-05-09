import Popup from '../main/components/Popup/Popup';

export default function RemoveCard({ isOpen, onClose }) {
  return (
    isOpen && (
      <Popup title="¿Estás seguro?" 
      onClose={onClose} 
      buttonText="Eliminar">
      </Popup>
    )
  );
}