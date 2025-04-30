import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// הגדרת טיפוסים
interface PageView {
    timestamp: number;
    path: string;
    referrer: string;
    userAgent: string;
    screenSize: {
        width: number;
        height: number;
    };
    language: string;
    timeZone: string;
    sessionId: string;
    timeSpent?: number;
    ip?: string; // יתמלא בצד שרת
    location?: { // יתמלא בצד שרת או אם המשתמש מאשר
        country?: string;
        region?: string;
        city?: string;
    };
}

interface AnalyticsTrackerProps {
    apiEndpoint: string; // הנקודת קצה של ה-API שלך
    siteId: string; // מזהה ייחודי לאתר (למקרה שיש לך כמה אתרים)
}

const generateSessionId = (): string => {
    // יצירת מזהה סשן ייחודי - משתמש במזהה מהלוקל סטורג' אם קיים או יוצר חדש
    const storedSessionId = localStorage.getItem('analytics_session_id');
    if (storedSessionId) return storedSessionId;

    const newSessionId = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    localStorage.setItem('analytics_session_id', newSessionId);
    return newSessionId;
};

export const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({ apiEndpoint, siteId }) => {
    const location = useLocation();
    const lastPathRef = useRef<string>(location.pathname);
    const entryTimeRef = useRef<number>(Date.now());
    const sessionId = useRef<string>(generateSessionId());

    // שליחת נתונים לשרת
    const sendPageView = async (path: string, timeSpent?: number) => {
        try {
            const pageView: PageView = {
                timestamp: Date.now(),
                path,
                referrer: document.referrer || 'direct',
                userAgent: navigator.userAgent,
                screenSize: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                language: navigator.language,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                sessionId: sessionId.current,
            };

            // אם יש מידע על זמן שהייה, נוסיף אותו
            if (timeSpent) {
                pageView.timeSpent = timeSpent;
            }

            // שליחת הנתונים לשרת
            await fetch(`${apiEndpoint}/track`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    siteId,
                    pageView,
                }),
                // השליחה יכולה להתבצע ברקע בלי לחכות לתשובה
                credentials: 'omit',
            });
        } catch (error) {
            // בלעת שגיאות כדי שלא יפריע לחווית המשתמש
            console.error('Analytics error:', error);
        }
    };

    // איסוף מידע בטעינת הדף ובניווט בין דפים
    useEffect(() => {
        // שליחת צפייה בדף בטעינה ראשונית
        sendPageView(location.pathname);

        // מעקב אחר שינויים בניווט
        const handleRouteChange = () => {
            const timeSpent = Date.now() - entryTimeRef.current;

            // שליחת נתונים על הדף הקודם כולל זמן שהייה
            sendPageView(lastPathRef.current, timeSpent);

            // עדכון הנתיב האחרון וזמן הכניסה
            lastPathRef.current = location.pathname;
            entryTimeRef.current = Date.now();
        };

        // האזנה לשינויים בנתיב
        return () => {
            handleRouteChange();
        };
    }, [location.pathname]);

    // מעקב אחר יציאה מהאתר
    useEffect(() => {
        const handleBeforeUnload = () => {
            const timeSpent = Date.now() - entryTimeRef.current;

            // שימוש ב-sendBeacon API לשליחת הנתונים לפני יציאה מהדף
            const data = JSON.stringify({
                siteId,
                pageView: {
                    timestamp: Date.now(),
                    path: lastPathRef.current,
                    referrer: document.referrer || 'direct',
                    userAgent: navigator.userAgent,
                    screenSize: {
                        width: window.innerWidth,
                        height: window.innerHeight,
                    },
                    language: navigator.language,
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    sessionId: sessionId.current,
                    timeSpent,
                },
            });

            navigator.sendBeacon(`${apiEndpoint}/track`, data);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // הקומפוננטה לא מרנדרת שום דבר
    return null;
};