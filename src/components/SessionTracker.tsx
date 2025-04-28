// components/SessionTracker.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../firebase';

const SessionTracker: React.FC = () => {
    const [sessionId] = useState(() => {
        // Use existing sessionId or create new one
        const existingId = localStorage.getItem('session_id');
        if (existingId) return existingId;

        const newId = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('session_id', newId);
        return newId;
    });

    const [startTime] = useState(new Date());
    const location = useLocation();

    // Track page views
    useEffect(() => {
        const currentPage = location.pathname;
        const entryTime = new Date();

        // Store current page entry time
        localStorage.setItem(`page_start_${currentPage}`, entryTime.toISOString());

        // Send page view event
        trackEvent('page_visited', {
            page: currentPage,
            sessionId: sessionId,
            entryTime: entryTime.toISOString(),
            language: document.documentElement.lang,
            referrer: document.referrer || 'direct',
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            userAgent: navigator.userAgent
        });

        // Track page exit
        const trackExit = () => {
            const pageStartStr = localStorage.getItem(`page_start_${currentPage}`);
            if (pageStartStr) {
                const pageStart = new Date(pageStartStr);
                const timeSpent = (new Date().getTime() - pageStart.getTime()) / 1000; // in seconds

                // Send page exit event
                trackEvent('page_exit', {
                    page: currentPage,
                    sessionId: sessionId,
                    timeSpent: timeSpent,
                    exitTime: new Date().toISOString()
                });
            }
        };

        // Watch for page/site exit
        window.addEventListener('beforeunload', trackExit);

        return () => {
            window.removeEventListener('beforeunload', trackExit);
            trackExit(); // Also call when navigating between pages
        };
    }, [location.pathname, sessionId]);

    // Track total session duration
    useEffect(() => {
        const totalSessionTracker = setInterval(() => {
            const sessionDuration = (new Date().getTime() - startTime.getTime()) / 1000;
            // Update every minute
            if (sessionDuration % 60 < 1) {
                trackEvent('session_duration_update', {
                    sessionId: sessionId,
                    durationSeconds: Math.floor(sessionDuration),
                    timestamp: new Date().toISOString()
                });
            }
        }, 1000);

        return () => clearInterval(totalSessionTracker);
    }, [sessionId, startTime]);

    return null; // This component doesn't render anything
};

export default SessionTracker;