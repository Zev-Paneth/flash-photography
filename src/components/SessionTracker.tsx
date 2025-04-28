// components/SessionTracker.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEventWithStorage } from '../firestore'; // שינוי ל-trackEventWithStorage

const SessionTracker: React.FC = () => {
    const [sessionId] = useState(() => {
        // השתמש ב-sessionId קיים או צור חדש
        const existingId = localStorage.getItem('session_id');
        if (existingId) return existingId;

        const newId = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('session_id', newId);
        return newId;
    });

    const [startTime] = useState(new Date());
    const location = useLocation();

    // מעקב אחר כניסה לדפים
    useEffect(() => {
        const currentPage = location.pathname;
        const entryTime = new Date();

        // שמור מידע על הכניסה לדף הנוכחי
        localStorage.setItem(`page_start_${currentPage}`, entryTime.toISOString());

        // שלח אירוע כניסה לדף - השתמש ב-trackEventWithStorage במקום
        trackEventWithStorage('page_visited', {
            page: currentPage,
            sessionId: sessionId,
            entryTime: entryTime.toISOString(),
            language: document.documentElement.lang,
            referrer: document.referrer || 'direct',
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            userAgent: navigator.userAgent
        });

        // מעקב אחר יציאה מדף
        const trackExit = () => {
            const pageStartStr = localStorage.getItem(`page_start_${currentPage}`);
            if (pageStartStr) {
                const pageStart = new Date(pageStartStr);
                const timeSpent = (new Date().getTime() - pageStart.getTime()) / 1000; // בשניות

                // שלח אירוע יציאה מהדף - השתמש ב-trackEventWithStorage במקום
                trackEventWithStorage('page_exit', {
                    page: currentPage,
                    sessionId: sessionId,
                    timeSpent: timeSpent,
                    exitTime: new Date().toISOString()
                });
            }
        };

        // עקוב אחר יציאה מהדף/אתר
        window.addEventListener('beforeunload', trackExit);

        return () => {
            window.removeEventListener('beforeunload', trackExit);
            trackExit(); // קרא גם בעת מעבר בין דפים
        };
    }, [location.pathname, sessionId]);

    // מעקב אחר משך זמן הסשן הכולל
    useEffect(() => {
        const totalSessionTracker = setInterval(() => {
            const sessionDuration = (new Date().getTime() - startTime.getTime()) / 1000;
            // עדכן כל דקה
            if (sessionDuration % 60 < 1) {
                trackEventWithStorage('session_duration_update', {
                    sessionId: sessionId,
                    durationSeconds: Math.floor(sessionDuration),
                    timestamp: new Date().toISOString()
                });
            }
        }, 1000);

        return () => clearInterval(totalSessionTracker);
    }, [sessionId, startTime]);

    return null; // רכיב זה אינו מציג שום דבר
};

export default SessionTracker;