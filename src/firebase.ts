// firebase.ts - הגדרת Firebase ו-Analytics בלבד
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setUserId, setUserProperties,  } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// אתחול Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

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

export { analytics, app, storage };