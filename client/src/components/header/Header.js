import React from 'react';
import logo from '../../images/uta-course-calendar-280.png';
import './Header.scss';

const Header = () => (
    <header className="main-header">
        <div className="main-header-logo-heading-wrapper">
            <img src={logo} className="main-header-logo" alt="logo" />
            <h1 className="main-header-heading">Uta course calendar</h1>
        </div>
    </header>
);

export default Header;
