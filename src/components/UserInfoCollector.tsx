// components/UserInfoCollector.tsx
import { useEffect } from 'react';
import { trackEvent, setAnalyticsUserId, setAnalyticsUserProperties } from '../firebase';

const UserInfoCollector: React.FC = () => {
    useEffect(() => {
        // Wait briefly before collecting info
        setTimeout(() => {
            const sessionId = localStorage.getItem('session_id');

            // Set the session ID as the user ID for Firebase
            if (sessionId) {
                setAnalyticsUserId(sessionId);
            }

            // Collect basic user information
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

            // Send user info as an event
            trackEvent('user_info_collected', userInfo);

            // Also set these as user properties for better segmentation in Firebase
            setAnalyticsUserProperties({
                language: navigator.language,
                screenSize: `${window.innerWidth}x${window.innerHeight}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                preferredLanguage: document.documentElement.lang,
                platform: navigator.platform
            });

            // Try to get geolocation (requires user permission)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        trackEvent('user_location', {
                            sessionId,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            timestamp: new Date().toISOString()
                        });
                    },
                    // Empty error function - if user doesn't allow geolocation
                    () => {},
                    { timeout: 10000, enableHighAccuracy: false }
                );
            }
        }, 2000); // Wait 2 seconds for site to load
    }, []);

    return null;
};

export default UserInfoCollector;