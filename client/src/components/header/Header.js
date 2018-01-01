import React from 'react';
import utaLogo from '../../images/utaen-small.png';
import './Header.scss';

const Header = () => (
    <header className="main-header">
        <h1 className="main-header-heading">Uta course calendar</h1>
        <img src={utaLogo} alt="University of Tampere logo" className="main-header-logo" />
    </header>
);

export default Header;
