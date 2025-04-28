// components/InteractionTracker.tsx
import { useEffect } from 'react';
import { trackEvent } from '../firebase';

const InteractionTracker: React.FC = () => {
    useEffect(() => {
        const sessionId = localStorage.getItem('session_id');

        // Track clicks
        const trackClicks = (e: MouseEvent) => {
            // Check if the click is on a link or button
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

                // Get the href if it's a link
                const href = isLink
                    ? (target.getAttribute('href') || target.closest('a')?.getAttribute('href') || '')
                    : '';

                trackEvent('element_clicked', {
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

        // Listen for clicks
        document.addEventListener('click', trackClicks);

        // Track form submissions
        const trackFormSubmits = (e: SubmitEvent) => {
            const form = e.target as HTMLFormElement;
            const formId = form.id || '';
            const formAction = form.action || '';

            trackEvent('form_submitted', {
                sessionId,
                formId,
                formAction,
                path: window.location.pathname,
                timestamp: new Date().toISOString()
            });
        };

        // Listen for form submissions
        document.addEventListener('submit', trackFormSubmits);

        return () => {
            document.removeEventListener('click', trackClicks);
            document.removeEventListener('submit', trackFormSubmits);
        };
    }, []);

    return null;
};

export default InteractionTracker;