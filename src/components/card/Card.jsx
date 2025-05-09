import { useState } from 'react'
import deleteButton from '../../images/Trash.png'

export default function Card({ card, onOpenImagePopup, onOpenRemovePopup }) {
    const { name, link, } = card;
    const [isLiked, setIsLiked] = useState(false);
    
    const handleImageClick = () => {
      onOpenImagePopup('imagePopup', link);
    };
    
    const toggleLike = () => {
      setIsLiked(prev => !prev);
    };

    return (
        <li className="grid__element" data-id={card._id}>
      <img
        className="grid__image"
        src={link}
        alt={`Imagen de ${name}`}
        onClick={handleImageClick}
      />
      <button
        aria-label="Delete card"
        className="delete-button"
        type="button"
        onClick={onOpenRemovePopup}
      >
        <img src={deleteButton}></img>
      </button>
      <div className="grid__title">
      <h2 className="grid__text">{name}</h2>
      <button
        aria-label="Like card"
        type="button"
        className={`like-button ${isLiked ? 'like-button_pressed' : ''}`}
        onClick={toggleLike}
      >
      </button>
      </div>
    </li>
    );
  }