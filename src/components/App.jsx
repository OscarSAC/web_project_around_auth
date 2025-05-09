import { useState } from 'react'
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import EditAvatarPopup from './Avatar/EditAvatar';
import EditProfilePopup from './EditProfile/EditProfile';
import NewCardPopup from './NewCard/NewCard';
import ImagePopup from './ImagePopup/ImagePopup';
import RemoveCardPopup from './RemoveCard/RemoveCard';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  

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


  return (
    <>
      <div className="page">
        <Header/>
        <Main onOpenEditProfilePopup={() => handleOpenPopup('editProfile')} 
        onOpenNewPlacePopup={() => handleOpenPopup('newPlace')}
        onOpenImagePopup={handleOpenPopup} 
        onOpenEditAvatarPopup={() => handleOpenPopup('editAvatar')}
        onOpenRemovePopup={()=> handleOpenPopup('removeCard')}
        />
        <Footer/>
        {isPopupOpen && popupType === 'editAvatar' && (
  <EditAvatarPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        )}
        {isPopupOpen && popupType === 'editProfile' && (
  <EditProfilePopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        )}
        {isPopupOpen && popupType === 'newPlace' && (
        <NewCardPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        )}      
        {isPopupOpen && popupType === 'imagePopup' && ( 
          <ImagePopup isOpen = {isPopupOpen} onClose={handleClosePopup}
           imageUrl={popupImage}/>
        )}
        {isPopupOpen && popupType === 'removeCard' && ( 
          <RemoveCardPopup isOpen = {isPopupOpen} onClose={handleClosePopup}/>
        )}
        </div>
    </>
  )
}

export default App
