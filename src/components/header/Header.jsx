import React from 'react';
import logo from '../../images/Vector.png';

const Header = () => {
    return (
<header className="header">
     <img
          src={logo}
          alt="Around the U.S logo"
          className="header__image"
        />
 </header> );
};

export default Header;