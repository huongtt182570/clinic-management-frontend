// Header.jsx
import React from 'react';
import './style.scss';

const Headers: React.FC = () => {
    return (
        <div className="headers">
            <p className='clinics'> Clinic Management</p>
            <div className="tabs-headers">
                <a href="/" className="tab-header">Đăng xuất</a>
            </div>
        </div>
    );
};

export default Headers;
