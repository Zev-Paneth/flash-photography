import React from 'react';
import { Language } from '../App';

interface LanguageSwitcherProps {
    currentLanguage: Language;
    onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
                                                               currentLanguage,
                                                               onLanguageChange
                                                           }) => {
    return (
        <div style={{ zIndex: 90}} className="absolute top-0 right-4 flex gap-2 py-2 z-10">
            <button
                className={`px-2 py-1 text-sm transition-colors duration-300 ${
                    currentLanguage === 'en'
                        ? 'text-gray-800 font-medium'
                        : 'text-gray-500 hover:text-amber-700'
                }`}
                onClick={() => onLanguageChange('en')}
            >
                English
            </button>
            <button
                className={`px-2 py-1 text-sm transition-colors duration-300 ${
                    currentLanguage === 'he'
                        ? 'text-gray-800 font-medium'
                        : 'text-gray-500 hover:text-amber-700'
                }`}
                onClick={() => onLanguageChange('he')}
            >
                עברית
            </button>
            <button
                className={`px-2 py-1 text-sm transition-colors duration-300 ${
                    currentLanguage === 'nl'
                        ? 'text-gray-800 font-medium'
                        : 'text-gray-500 hover:text-amber-700'
                }`}
                onClick={() => onLanguageChange('nl')}
            >
                Nederlands
            </button>
        </div>
    );
};

export default LanguageSwitcher;