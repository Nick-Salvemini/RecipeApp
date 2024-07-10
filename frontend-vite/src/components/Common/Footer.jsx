import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start fixed-bottom">
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2024 Recipe Generator:
                <a className="text-dark" href="https://yourdomain.com/">yourdomain.com</a>
            </div>
        </footer>
    );
};

export default Footer;