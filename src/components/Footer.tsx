import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Language } from '../App';

interface FooterProps {
    language: Language;
}

const Footer: React.FC<FooterProps> = ({ language: _ }) => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Link to="/" className="block mb-4">
                            <img src="/logo-white.svg" alt="Photography Logo" className="h-12 w-auto" />
                        </Link>
                        <p className="text-gray-400 text-sm">
                            <FormattedMessage id="footer.tagline" defaultMessage="Capturing life's most precious moments with an artistic touch and professional care." />
                        </p>
                    </div>

                    <div>
                        <h3 className="font-cormorant text-xl mb-4">
                            <FormattedMessage id="footer.quickLinks" defaultMessage="Quick Links" />
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-amber-700 transition-colors text-sm">
                                    <FormattedMessage id="nav.home" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="text-gray-400 hover:text-amber-700 transition-colors text-sm">
                                    <FormattedMessage id="nav.gallery" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-400 hover:text-amber-700 transition-colors text-sm">
                                    <FormattedMessage id="nav.services" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-amber-700 transition-colors text-sm">
                                    <FormattedMessage id="nav.about" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-amber-700 transition-colors text-sm">
                                    <FormattedMessage id="nav.contact" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-cormorant text-xl mb-4">
                            <FormattedMessage id="footer.services" defaultMessage="Services" />
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services/newborn" className="text-gray-400 hover:text-amber-700 transition-colors text-sm">
                                    <FormattedMessage id="services.newborn" defaultMessage="Newborn Photography" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/family" className="text-gray-400 hover:text-amber-700 transition-colors text-sm">
                                    <FormattedMessage id="services.family" defaultMessage="Family Photography" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/children" className="text-gray-400 hover:text-amber-700 transition-colors text-sm">
                                    <FormattedMessage id="services.children" defaultMessage="Children Photography" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-cormorant text-xl mb-4">
                            <FormattedMessage id="footer.contact" defaultMessage="Contact Info" />
                        </h3>
                        <address className="not-italic text-gray-400 text-sm">
                            <p className="mb-2">Flash Photography</p>
                            <p className="mb-2">Antwerp, Belgium</p>
                            <p className="mb-2">
                                <a href="mailto:panethch@gmail.com" className="hover:text-amber-700 transition-colors">
                                    panethch@gmail.com
                                </a>
                            </p>
                            <p className="mb-2">
                                <a href="tel:+32493942024" className="hover:text-amber-700 transition-colors">
                                    +324 9394 2024
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
                    <FormattedMessage id="footer.copyright" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;