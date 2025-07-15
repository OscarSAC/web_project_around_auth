import Popup from '../Popup/Popup';

export default function RemoveCard({ isOpen, onClose, onConfirmDelete }) {
  return (
    isOpen && (
      <Popup isOpen={isOpen} title="¿Estás seguro?" 
      onClose={onClose} 
      buttonText="Eliminar"
      onSubmit={onConfirmDelete}>
      </Popup>
    )
  );
}