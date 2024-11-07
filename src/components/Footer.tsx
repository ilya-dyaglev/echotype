import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="copyright-container">
                <div className="label">
                    built by <span>@idyaglev</span>
                </div>
                <div className="footer-image-icon"></div>
            </div>
        </div>
    );
};

export default Footer;
