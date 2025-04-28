// components/InteractionTracker.tsx
import { useEffect } from 'react';
import { trackEventWithStorage } from '../firestore'; // שינוי ל-trackEventWithStorage

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
                const elementId = target.id || '';
                const elementClass = target.className || '';

                // קבל את ה-href אם זה קישור
                const href = isLink
                    ? (target.getAttribute('href') || target.closest('a')?.getAttribute('href') || '')
                    : '';

                trackEventWithStorage('element_clicked', {
                    sessionId,
                    elementType: isButton ? 'button' : (isLink ? 'link' : clickedElement),
                    elementText: elementText || 'unknown',
                    elementId,
                    elementClass,
                    href,
                    path: window.location.pathname,
                    timestamp: new Date().toISOString()
                });
            }
        };

        // האזן ללחיצות
        document.addEventListener('click', trackClicks);

        // מעקב אחר שליחת טפסים
        const trackFormSubmits = (e: SubmitEvent) => {
            const form = e.target as HTMLFormElement;
            const formId = form.id || '';
            const formAction = form.action || '';

            trackEventWithStorage('form_submitted', {
                sessionId,
                formId,
                formAction,
                path: window.location.pathname,
                timestamp: new Date().toISOString()
            });
        };

        // האזן לשליחת טפסים
        document.addEventListener('submit', trackFormSubmits);

        return () => {
            document.removeEventListener('click', trackClicks);
            document.removeEventListener('submit', trackFormSubmits);
        };
    }, []);

    return null;
};

export default InteractionTracker;