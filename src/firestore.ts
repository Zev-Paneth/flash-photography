// firestore.ts - קובץ נפרד להגדרת Firestore
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from './firebase'; // ייבוא ה-app מקובץ firebase
import { trackEvent } from './firebase'; // ייבוא פונקציית המעקב מקובץ firebase

// קבלת מופע Firestore
const db = getFirestore(app);

// פונקציה לשמירת אירועי אנליטיקה ב-Firestore
export const saveAnalyticsEvent = async (
    eventName: string,
    eventParams: Record<string, any>
) => {
    try {
        // הוספת חותמת זמן אם לא קיימת
        const params = {
            ...eventParams,
            timestamp: eventParams.timestamp || new Date().toISOString() // עדיף להשתמש ב-ISO string במקום serverTimestamp
        };

        console.log(`Saving to Firestore: ${eventName}`, params); // לוג לבדיקה

        // שמירה באוסף analytics_events
        await addDoc(collection(db, 'analytics_events'), {
            eventName,
            ...params,
            recordedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error saving analytics event to Firestore:', error);
    }
};

// פונקציית מעקב משופרת ששומרת גם ב-Firebase Analytics וגם ב-Firestore
export const trackEventWithStorage = (
    eventName: string,
    eventParams?: Record<string, any>
) => {
    // מעקב ב-Firebase Analytics
    trackEvent(eventName, eventParams);

    // שמירה ב-Firestore עבור הדשבורד
    saveAnalyticsEvent(eventName, eventParams || {});
};

export { db };