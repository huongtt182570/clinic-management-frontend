// Header.jsx
import React from 'react';
import './style.scss';

const Header: React.FC = () => {
  return (
    <div className="header">
      <p className='clinic'> Clinic Management</p>
      <div className="tabs">
        <a href="/about" className="tab">Về chúng tôi</a>
        <a href="/login" className="tab">Đăng nhập</a>
      </div>
    </div>
  );
};

export default Header;
