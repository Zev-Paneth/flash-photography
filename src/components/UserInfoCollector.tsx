// components/UserInfoCollector.tsx
import { useEffect } from 'react';
import { track } from '@vercel/analytics/react';

const UserInfoCollector: React.FC = () => {
    useEffect(() => {
        // המתן מעט לפני איסוף המידע
        setTimeout(() => {
            const sessionId = localStorage.getItem('session_id');

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

            // שליחת המידע כאירוע
            track('user_info_collected', userInfo);

            // ניסיון לקבל מידע גיאוגרפי (דורש אישור המשתמש)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        track('user_location', {
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