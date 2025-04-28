import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import { IntlProvider } from 'react-intl';
import messages from './translations/messages';
// Remove Vercel Analytics import
// import { Analytics } from '@vercel/analytics/react';
import SessionTracker from "./components/SessionTracker";
import UserInfoCollector from "./components/UserInfoCollector";
import InteractionTracker from "./components/InteractionTracker";
import { trackEvent } from './firebase';
import AnalyticsDashboard from "./components/AnalyticsDashboard.tsx"; // Import Firebase tracking

// Define available languages
export type Language = 'en' | 'he' | 'nl'; // English, Hebrew, Flemish

const App: React.FC = () => {
    // Set default language to English or use stored preference
    const [language, setLanguage] = useState<Language>(() => {
        const storedLang = localStorage.getItem('preferredLanguage') as Language;
        return storedLang || 'en';
    });

    // Update language direction for RTL support (Hebrew)
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
        localStorage.setItem('preferredLanguage', language);

        // Track language change with Firebase
        trackEvent('language_changed', {
            language,
            timestamp: new Date().toISOString()
        });
    }, [language]);


    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <Router>
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
                            <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
                        </Routes>
                    </main>
                    <Footer language={language} />
                    {/* Remove Vercel Analytics component */}
                    {/* <Analytics /> */}
                    <SessionTracker />
                    <UserInfoCollector />
                    <InteractionTracker />
                </div>
            </Router>
        </IntlProvider>
    );
};

export default App;