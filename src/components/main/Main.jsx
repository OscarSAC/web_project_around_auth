import React, {useState, useEffect, useContext} from 'react';
import profilePic from '../../images/profile_pic.jpg';
import profileEditImage from '../../images/Vector_lapiz_editar.png';
import editButtonImage from '../../images/edit_Vector.png';
import addButtonImage from '../../images/add_vector.png';
import Card from './card/Card';
import { api } from "../../utils/api";
import CurrentUserContext from '../contexts/CurrentUserContext';
import RemoveCard from './components/RemoveCard/RemoveCard';

window.api = api; 

const Main = ({
  cards,
  onLikeCard,
  onConfirmDelete,
  onOpenEditProfilePopup, 
  onOpenNewPlacePopup, 
  onOpenImagePopup, 
  onOpenEditAvatarPopup, 
  onOpenRemovePopup
  }) => {
    
    const {currentUser} = useContext(CurrentUserContext);
    const [cardToDelete, setCardToDelete] = useState(null);


 return (
    <main className="main">
        <section className="profile">
            <div className="profile__image-container">
               <img className="profile__image" 
                    src={currentUser.avatar || profilePic} 
                    alt="Imagen de perfil" 
                    onClick={onOpenEditAvatarPopup}/>
               <img
                 className="profile__edit-overlay"
                 src={profileEditImage}
                 alt="editar imagen"
                />
             </div>
            <div className="profile__info">
               <div className="profile__name">
                  <h1 className="profile__name-text">{currentUser.name}</h1>
                  <button className="edit-button" id="edit-button" onClick={onOpenEditProfilePopup}>
                    <img
                      className="edit-button-image"
                      src={editButtonImage}
                      alt="click para editar"
                    />
                  </button>
                </div>
               <p className="profile__description">{currentUser.about}</p>
             </div>
                <button className="profile__add-button" id="add-place-button"
                    onClick={onOpenNewPlacePopup}>
                  <img
                    className="add-button-image"
                    src={addButtonImage}
                    alt="click para agregar otra imagen"
                  />
                </button>
        </section>
        <section className="grid">
          {
    currentUser?._id && cards.length > 0 && cards.map((card) => {
      const isLiked = Array.isArray(card.likes) && card.likes.some(
        (like) => like._id === currentUser._id
      );
      // console.log("Renderizando card", card._id, "isLiked:", isLiked);

          return (
            <Card
              key={card._id}
              card={card}
              isLiked={card.isLiked} 
              onOpenImagePopup={onOpenImagePopup}
              onOpenRemovePopup={() => setCardToDelete(card)}
              onLikeCard={onLikeCard}
            />
          );
        })}
         <RemoveCard
          isOpen={!!cardToDelete}
          onClose={() => setCardToDelete(null)}
          onConfirmDelete={() => {
            onConfirmDelete(cardToDelete);
            setCardToDelete(null);
          }}
         />
        </section>
    </main>
 );
};

 export default Main;

   