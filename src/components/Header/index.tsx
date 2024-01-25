// Header.jsx
import React from 'react';
import './style.scss';

const Header: React.FC = () => {
  return (
    <div className="header">
      <p className='clinic'> Clinic Management</p>
      <div className="tabs">
        <a href="/about" className="tab">About Us</a>
        <a href="/login" className="tab">Login</a>
      </div>
    </div>
  );
};

export default Header;
