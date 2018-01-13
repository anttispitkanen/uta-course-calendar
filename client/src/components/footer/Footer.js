import React from 'react';
import './Footer.scss';
import UTALogo from '../../images/utaen-small.png';

const Footer = () => (
    <footer className="main-footer">
        <a href="https://uta.fi"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img className="footer-uta-logo"
                    src={UTALogo}
                    alt="University of Tampere logo" />
        </a>
        <div className="copyright">
            © 2018 <a href="https://github.com/anttispitkanen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >Antti Pitkänen</a>
        </div>
    </footer>
);

export default Footer;
