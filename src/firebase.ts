// firebase.ts - Place this in your src directory
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setUserId, setUserProperties } from 'firebase/analytics';


// Your Firebase configuration
// Replace with your actual Firebase config values from the Firebase console

    const firebaseConfig = {
        apiKey: "AIzaSyD0B0XmVKY3_nff1RxO15QYvDqyS3VWD_0",
        authDomain: "flash-photography-b5b20.firebaseapp.com",
        projectId: "flash-photography-b5b20",
        storageBucket: "flash-photography-b5b20.firebasestorage.app",
        messagingSenderId: "241980521646",
        appId: "1:241980521646:web:f53a541e17530468a7c13f",
        measurementId: "G-W82TFVVZH9"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);


// Track function - replacement for Vercel's track
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    try {
        logEvent(analytics, eventName, eventParams);
    } catch (error) {
        console.error('Error logging event:', error);
    }
};

// Set user ID
export const setAnalyticsUserId = (userId: string) => {
    try {
        setUserId(analytics, userId);
    } catch (error) {
        console.error('Error setting user ID:', error);
    }
};

// Set user properties
export const setAnalyticsUserProperties = (properties: Record<string, any>) => {
    try {
        setUserProperties(analytics, properties);
    } catch (error) {
        console.error('Error setting user properties:', error);
    }
};

export { analytics };

// firestore.ts - Place this in your src directory
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getApp } from 'firebase/app';

// Get Firestore instance
const db = getFirestore(getApp());

// Function to save analytics events to Firestore
export const saveAnalyticsEvent = async (
    eventName: string,
    eventParams: Record<string, any>
) => {
    try {
        // Add timestamp if not provided
        const params = {
            ...eventParams,
            timestamp: eventParams.timestamp || serverTimestamp()
        };

        // Save to analytics_events collection
        await addDoc(collection(db, 'analytics_events'), {
            eventName,
            ...params,
            recordedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error saving analytics event to Firestore:', error);
    }
};

// Enhanced tracking function that logs to both Firebase Analytics and Firestore
export const trackEventWithStorage = (
    eventName: string,
    eventParams?: Record<string, any>
) => {
    // Import these functions here to avoid circular dependencies
    const { trackEvent } = require('./firebase');

    // Track with Firebase Analytics
    trackEvent(eventName, eventParams);

    // Also save to Firestore for our dashboard
    saveAnalyticsEvent(eventName, eventParams || {});
};

export { db };