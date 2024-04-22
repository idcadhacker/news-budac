import React from 'react';
import logo from './News.png'; // Import the logo image
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <span className="logo-text">Novinky</span>
      </div>
    </nav>
  );
};

export default Navbar;
