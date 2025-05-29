import { useState, useContext } from 'react';
import deleteButton from '../../../../images/Trash.png';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';
import "../../../../blocks/photo-grid.css";
import likeInactive from "../../../../images/like_Vector.png";
import likeActive from "../../../../images/like_vector_active.png";

export default function Card({ card, 
  isLiked,
  onOpenImagePopup, 
  onOpenRemovePopup, 
  onLikeCard,
  onDeleteCard
}) 
  {

  
    const { name, link, } = card;

    
    const cardLikeButtonClassName = `like-button ${
    isLiked ? 'like-button_pressed' : ''
  }`;
   
    const handleImageClick = () => {
      onOpenImagePopup('imagePopup', link);
    };
    

    const handleLikeClick = () => {
      // console.log("Card clicked:", card._id, "isLiked antes:", isLiked);
    // onLikeCard(card._id, !isLiked); 
    onLikeCard(card);
  };

  const handleDeleteclick = () => {
    onOpenRemovePopup(card);
  }

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
        onClick={handleDeleteclick}
      >
        <img src={deleteButton}></img>
      </button>
      <div className="grid__title">
      <h2 className="grid__text">{name}</h2>
      <button
        aria-label="Like card"
        type="button"
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
        style={{
          backgroundImage: `url(${isLiked ? likeActive : likeInactive})`
          }}
      >
      </button>
      </div>
    </li>
    );
  }