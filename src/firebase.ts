// firebase.ts - הגדרת Firebase ו-Analytics בלבד
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setUserId, setUserProperties } from 'firebase/analytics';

// תצורת Firebase שלך
const firebaseConfig = {
    apiKey: "AIzaSyD0B0XmVKY3_nff1RxO15QYvDqyS3VWD_0",
    authDomain: "flash-photography-b5b20.firebaseapp.com",
    projectId: "flash-photography-b5b20",
    storageBucket: "flash-photography-b5b20.appspot.com", // תיקון - היה שגוי
    messagingSenderId: "241980521646",
    appId: "1:241980521646:web:f53a541e17530468a7c13f",
    measurementId: "G-W82TFVVZH9"
};

// אתחול Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// פונקציית מעקב - תחליף ל-track של Vercel
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    try {
        console.log(`Tracking event: ${eventName}`, eventParams); // לוג לבדיקה
        logEvent(analytics, eventName, eventParams);
    } catch (error) {
        console.error('Error logging event:', error);
    }
};

// הגדרת מזהה משתמש
export const setAnalyticsUserId = (userId: string) => {
    try {
        setUserId(analytics, userId);
    } catch (error) {
        console.error('Error setting user ID:', error);
    }
};

// הגדרת מאפייני משתמש
export const setAnalyticsUserProperties = (properties: Record<string, any>) => {
    try {
        setUserProperties(analytics, properties);
    } catch (error) {
        console.error('Error setting user properties:', error);
    }
};

export { analytics, app }; // ייצוא גם של ה-app לשימוש ב-firestore.ts