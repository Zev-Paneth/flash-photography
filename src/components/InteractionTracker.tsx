// components/InteractionTracker.tsx
import { useEffect } from 'react';
import { track } from '@vercel/analytics/react';

const InteractionTracker: React.FC = () => {
    useEffect(() => {
        const sessionId = localStorage.getItem('session_id');

        // מעקב אחר לחיצות
        const trackClicks = (e: MouseEvent) => {
            // בדוק אם הלחיצה היא על קישור או כפתור
            const target = e.target as HTMLElement;
            const clickedElement = target.tagName;
            const isButton = target.tagName === 'BUTTON' ||
                target.closest('button') !== null ||
                target.getAttribute('role') === 'button';
            const isLink = target.tagName === 'A' || target.closest('a') !== null;

            if (isButton || isLink) {
                const elementText = target.textContent?.trim().substring(0, 50);

                track('element_clicked', {
                    sessionId,
                    elementType: isButton ? 'button' : (isLink ? 'link' : clickedElement),
                    elementText: elementText || 'unknown',
                    path: window.location.pathname,
                    timestamp: new Date().toISOString()
                });
            }
        };

        // האזן ללחיצות
        document.addEventListener('click', trackClicks);

        return () => {
            document.removeEventListener('click', trackClicks);
        };
    }, []);

    return null;
};

export default InteractionTracker;