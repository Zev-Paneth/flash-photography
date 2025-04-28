import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Language } from '../App';

interface NavbarProps {
    language: Language;
}

const Navbar: React.FC<NavbarProps> = ({ language: _ }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
            scrolled ? 'h-16 shadow-md' : 'h-20'
        } bg-white/95 backdrop-blur`}>
            <div className="container mx-auto px-4 h-full flex justify-between items-center">
                <div className="flex items-center h-16">
                    <Link to="/" className="block h-full py-1">
                        <img src="/logo.svg" alt="Flash Photography" className="h-full w-auto max-w-none" style={{ minWidth: "220px" }} />
                    </Link>
                </div>

                <div
                    className={`lg:hidden flex flex-col justify-between w-6 h-5 cursor-pointer relative z-50`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                        menuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}></span>
                    <span className={`w-full h-0.5 bg-gray-800 transition-opacity duration-300 ${
                        menuOpen ? 'opacity-0' : 'opacity-100'
                    }`}></span>
                    <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                        menuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}></span>
                </div>

                <ul className={`lg:flex items-center gap-8 ${
                    menuOpen
                        ? 'absolute top-full left-0 w-full flex flex-col bg-white shadow-md py-4 gap-4'
                        : 'hidden'
                }`}>
                    <li>
                        <Link
                            to="/"
                            className="uppercase text-sm tracking-wider relative hover:text-amber-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-amber-700 after:transition-all hover:after:w-full"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FormattedMessage id="nav.home" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/gallery"
                            className="uppercase text-sm tracking-wider relative hover:text-amber-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-amber-700 after:transition-all hover:after:w-full"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FormattedMessage id="nav.gallery" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/services"
                            className="uppercase text-sm tracking-wider relative hover:text-amber-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-amber-700 after:transition-all hover:after:w-full"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FormattedMessage id="nav.services" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="uppercase text-sm tracking-wider relative hover:text-amber-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-amber-700 after:transition-all hover:after:w-full"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FormattedMessage id="nav.about" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className="uppercase text-sm tracking-wider relative hover:text-amber-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-amber-700 after:transition-all hover:after:w-full"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FormattedMessage id="nav.contact" />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;