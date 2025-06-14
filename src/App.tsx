import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import {IntlProvider} from 'react-intl';
import messages from './translations/messages';
import ScrollToTop from "./utils/ScrollToTop.tsx";

// הגדר שפות זמינות
export type Language = 'en' | 'he' | 'nl'; // אנגלית, עברית, פלמית

const App: React.FC = () => {
    // הגדר שפת ברירת מחדל לאנגלית או השתמש בהעדפה שמורה
    const [language, setLanguage] = useState<Language>(() => {
        const storedLang = localStorage.getItem('preferredLanguage') as Language;
        return storedLang || 'en';
    });

    // עדכן את כיוון השפה לתמיכה ב-RTL (עברית)
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
        localStorage.setItem('preferredLanguage', language);
    }, [language]);

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <Router>
                <ScrollToTop />
                <div className={`font-montserrat text-gray-800 ${language === 'he' ? 'text-right' : 'text-left'}`}>
                    <Navbar language={language} />
                    <main className="pt-20">
                        <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </main>
                    <Footer language={language}/>
                </div>
            </Router>
        </IntlProvider>
    );
};

export default App;