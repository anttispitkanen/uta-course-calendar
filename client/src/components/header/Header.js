import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/uta-course-calendar-280.png';
import './Header.scss';

const Header = () => (
    <header className="main-header">
        <div className="main-header-logo-heading-wrapper">
            <img src={logo} className="main-header-logo" alt="logo" />
            <h1 className="main-header-heading">UTA course calendar</h1>
        </div>

        <Link to="/help" className="header-help-link">
            <span className="link-text">What is this?</span>
            <i className="link-icon fa fa-question-circle" />
        </Link>
    </header>
);

export default Header;
