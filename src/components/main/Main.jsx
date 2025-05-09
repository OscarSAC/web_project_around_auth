import React from 'react';
import profilePic from '../../images/profile_pic.jpg'
import profileEditImage from '../../images/Vector_lapiz_editar.png'
import editButtonImage from '../../images/edit_Vector.png'
import addButtonImage from '../../images/add_vector.png'
import Card from '../card/Card';

const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

console.log(cards);


const Main = ({onOpenEditProfilePopup, onOpenNewPlacePopup, onOpenImagePopup, onOpenEditAvatarPopup, onOpenRemovePopup}) => {
return (
<main className="main">
        <section className="profile">
          <div className="profile__image-container">
            <img className="profile__image" src={profilePic} alt="Imagen de perfil" onClick={onOpenEditAvatarPopup}/>
            <img
              className="profile__edit-overlay"
              src={profileEditImage}
              alt="editar imagen"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__name-text">Cousteau</h1>
              <button className="edit-button" id="edit-button" onClick={onOpenEditProfilePopup}>
                <img
                  className="edit-button-image"
                  src={editButtonImage}
                  alt="click para editar"
                />
              </button>
            </div>
            <p className="profile__description">Explorer</p>
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
        {/* <ul className="cards__list"> */}
    {cards.map((card) => (
      <Card key={card._id} card={card} onOpenImagePopup={onOpenImagePopup} onOpenRemovePopup={onOpenRemovePopup}/>
    ))}
  {/* </ul> */}
        </section>
      </main>
      );
    };

    export default Main;

   