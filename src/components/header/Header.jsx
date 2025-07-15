import React from 'react';
import logo from '../../images/Vector.png';


// const Header = ({ isLoggedIn, userEmail, onLogout }) => {
//   return (
//     <header className="header">
//       <img
//         src={logo}
//         alt="Around the U.S logo"
//         className="header__image"
//       />
//       <div className="header__user-info">
//         <span className="header__email">{userEmail}</span>
//         <button className="header__logout-btn" onClick={onLogout}>
//           Sign Out
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React from 'react';
// import logo from '../../images/Vector.png';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, userEmail, onLogout, showRegisterLink, showLoginLink }) => {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Around the U.S logo"
        className="header__image"
      />
      <div className="header__user-info">
        {isLoggedIn && (
          <>
            <span className="header__email">{userEmail}</span>
            <button className="header__logout-btn" onClick={onLogout}>
              Sign Out
            </button>
          </>
        )}
        {showRegisterLink && (
          <Link to="/signup" className="header__logout-btn">
            Regístrate
          </Link>
        )}
        {showLoginLink && (
          <Link to="/signin" className="header__logout-btn">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;