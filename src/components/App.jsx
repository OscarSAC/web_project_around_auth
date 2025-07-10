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
import { getToken, removeToken, setToken } from '../utils/token';
import Login from './main/components/Login/login';
import Register from './main/components/Register/register';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './main/components/ProtectedRoute/ProtectedRoute';
import * as auth from '../utils/auth';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [popupImage, setPopupImage] = useState("");

  const [currentUser, setCurrentUser]= useState({});
  const [cards, setCards] = useState([]);
  const [tooltip, setTooltip] = useState({ open: false, success: false, message: "" });
   const navigate = useNavigate();




useEffect(() => {
  const token = getToken();
  if (!token) return;

  api.getUserInfo()
    .then((data) => {
      setCurrentUser(data);
      setIsLoggedIn(true);
    })
    .catch((err) => {
      console.log("Token inválido o error al obtener usuario:", err);
      handleLogout();
    });
}, []);

useEffect(() => {
  if (!isLoggedIn) return;

  api.getUserCards()
    .then((data) => {
      if (Array.isArray(data)) {
        setCards(data);
      } else {
        setCards([]); // Fallback seguro
      }
    })
    .catch((err) => {
      console.log("Error al obtener tarjetas:", err);
      setCards([]); // También importante aquí
    });
}, [isLoggedIn]);

  

  const handleRegister = async (email, password) => {
    try {
      await auth.register(email, password);
      setTooltip({ open: true, success: true, message: '¡Registro exitoso!' });
      setTimeout(() => {
        setTooltip({ open: false, success: false, message: '' });
        navigate('/signin');
      }, 2000);
    } catch (err) {
      console.error("Error al registrarse:", err);
      setTooltip({ open: true, success: false, message: 'Error en el registro.' });
    }
  };

   const handleLogin = async (email, password) => {
    try {
      const { token } = await auth.authorize(email, password);
      // console.log('Token completo:', token);
    
      setToken(token);
      // console.log('Token insetado guardado en localStorage:', getToken());

      const storedToken = getToken();
    console.log('Token desde localStorage justo después de set:', storedToken);

      setIsLoggedIn(true);
      const userData = await auth.checkToken(token);
      setCurrentUser(userData.data);
      
      setTooltip({ open: true, success: true, message: '¡Ingreso exitoso!' });
      setTimeout(() => {
        setTooltip({ open: false, success: false, message: '' });
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);


      setTooltip({ open: true, success: false, message: 'Email o contraseña inválidos.' });
    }
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
  };

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
     await api.likeCard(card._id, !isLiked).then((NewCard) => {
     setCards((state) => state.map((currentCard) => currentCard._id === card._id ? NewCard : currentCard));
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

  const NewCard = await api.createCard(name, link);
    setCards([NewCard, ...cards]);
    handleClosePopup();
  }
     
 

  return (
  // <Router>
    <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
      <div className="page">
        <Header userEmail={currentUser?.email} onLogout={handleLogout} />
        <Routes>
          <Route 
            path="/"
            element= {
              <ProtectedRoute isLoggedIn = {isLoggedIn}> 
                <>          
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
                </>
              </ProtectedRoute> 
          }
          />
          <Route path="/signin" element={
            isLoggedIn ? <Navigate to ="/"/> :
            <Login
              onLogin={handleLogin}
              tooltip={tooltip}
              setTooltip={setTooltip} 
            />} 
          />
          <Route path="/signup" element={
             isLoggedIn ? <Navigate to ="/"/> :
             <Register 
              onRegister={handleRegister}
              tooltip={tooltip}
              setTooltip={setTooltip} 
            />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>


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
    // </Router>
  )
}

export default App
