import React from 'react';
import { A } from '../../utils/linkHelper';
import './Footer.scss';
import UTALogo from '../../images/utaen-small.png';

const Footer = () => (
    <footer className="main-footer">
        <A href="https://uta.fi">
            <img className="footer-uta-logo"
                    src={UTALogo}
                    alt="University of Tampere logo" />
        </A>
        <div className="copyright">
            © 2018 <A href="https://github.com/anttispitkanen"
                        className="footer-link"
                    >Antti Pitkänen</A>
        </div>
    </footer>
);

export default Footer;
