import { useState, useEffect } from 'react'
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import EditAvatar from './main/components/Avatar/EditAvatar';
import EditProfile from './main/components/EditProfile/EditProfile';
import NewCard from './main/components/NewCard/NewCard';
import ImagePopup from './main/components/ImagePopup/ImagePopup';
import RemoveCard from './main/components/RemoveCard/RemoveCard';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from "../utils/api";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [popupImage, setPopupImage] = useState("");

  const [currentUser, setCurrentUser]= useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
    .then((data) => setCurrentUser(data))
    .catch((err) => console.log("Error al obtener usuario:", err));
  },[]);
  
  useEffect(() => {
      api.getUserCards()
      .then((data) => {
        setCards(data);
        const initialLikes = {};
    }).catch((err) => {
      console.log("Error al obtener tarjetas:", err);
    })
  },[]);


  const handleOpenPopup = (type, imageLink ="") => {
    setPopupType(type);
    setPopupImage(imageLink);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupType(null);
    setPopupImage("");
  };
  
const handleUpdateUser = async ({ name, about }) => {
  await api.editUserInfo(name, about)
    .then((updatedUser) => {
      setCurrentUser(updatedUser); 
      handleClosePopup(); 
    })
    .catch((err) => {
      console.error("Error al actualizar el perfil:", err);
    });
};

const handleUpdateAvatar = ({avatar}) => {
  api.resetProfilePic(avatar)
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      handleClosePopup();
    })
    .catch((err) => {
      console.error("Error al actualizar foto de perfil", err);
    });
};

async function handleLikeCard(card) {
     const isLiked = card.isLiked;  
     await api.likeCard(card._id, !isLiked).then((newCard) => {
     setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch((error) => console.error(error));
    }

async function handleCardDelete(card) {
      // console.log("Intentando borrar card:", card);
    await api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((error) => {
      console.error(error);
    });
  }

async function handleAddPlace({name, link}){

  const newCard = await api.createCard(name, link);
    setCards([newCard, ...cards]);
    handleClosePopup();
  }
     

  return (
  
    <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
      <div className="page">
        <Header/>
        <Main 
        cards={cards}
        onLikeCard={handleLikeCard}
        onConfirmDelete={handleCardDelete}
        onOpenEditProfilePopup={() => handleOpenPopup('editProfile')} 
        onOpenNewPlacePopup={() => handleOpenPopup('newPlace')}
        onOpenImagePopup={handleOpenPopup} 
        onOpenEditAvatarPopup={() => handleOpenPopup('editAvatar')}
        onOpenRemovePopup={()=> handleOpenPopup('removeCard')}
        />
        <Footer/>
        {isPopupOpen && popupType === 'editAvatar' && (
        <EditAvatar isOpen={isPopupOpen} onClose={handleClosePopup} onUpdateAvatar={handleUpdateAvatar} />
        )}
        {isPopupOpen && popupType === 'editProfile' && (
        <EditProfile isOpen={isPopupOpen} onClose={handleClosePopup} onUpdateUser={handleUpdateUser}/>
        )}
        {isPopupOpen && popupType === 'newPlace' && (
        <NewCard isOpen={isPopupOpen} onClose={handleClosePopup} onNewCard={handleAddPlace} />
        )}      
        {isPopupOpen && popupType === 'imagePopup' && ( 
          <ImagePopup isOpen = {isPopupOpen} onClose={handleClosePopup}
           imageUrl={popupImage}/>
        )}
        {/* {isPopupOpen && popupType === 'removeCard' && ( 
          <RemoveCard isOpen = {isPopupOpen} onClose={handleClosePopup}/>
        )} */}
        </div>
    </CurrentUserContext.Provider>
  )
}

export default App
