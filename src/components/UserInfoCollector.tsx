// components/UserInfoCollector.tsx
import { useEffect } from 'react';
import { trackEventWithStorage } from '../firestore'; // שינוי ל-trackEventWithStorage
import { setAnalyticsUserId, setAnalyticsUserProperties } from '../firebase';

const UserInfoCollector: React.FC = () => {
    useEffect(() => {
        // המתן מעט לפני איסוף המידע
        setTimeout(() => {
            const sessionId = localStorage.getItem('session_id');

            // הגדר את מזהה הסשן כמזהה המשתמש ב-Firebase
            if (sessionId) {
                setAnalyticsUserId(sessionId);
            }

            // איסוף מידע בסיסי על המשתמש
            const userInfo = {
                sessionId,
                language: navigator.language,
                userAgent: navigator.userAgent,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                preferredLanguage: document.documentElement.lang,
                platform: navigator.platform,
                cookiesEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack,
                timestamp: new Date().toISOString()
            };

            // שליחת המידע כאירוע - השתמש ב-trackEventWithStorage במקום
            trackEventWithStorage('user_info_collected', userInfo);

            // הגדר מאפייני משתמש לסגמנטציה טובה יותר ב-Firebase
            setAnalyticsUserProperties({
                language: navigator.language,
                screenSize: `${window.innerWidth}x${window.innerHeight}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                preferredLanguage: document.documentElement.lang,
                platform: navigator.platform
            });

            // ניסיון לקבל מידע גיאוגרפי (דורש אישור המשתמש)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        trackEventWithStorage('user_location', {
                            sessionId,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            timestamp: new Date().toISOString()
                        });
                    },
                    // השתמש בפונקציית שגיאה ריקה - אם המשתמש לא מאשר גיאולוקציה
                    () => {},
                    { timeout: 10000, enableHighAccuracy: false }
                );
            }
        }, 2000); // המתן 2 שניות לטעינת האתר
    }, []);

    return null;
};

export default UserInfoCollector;