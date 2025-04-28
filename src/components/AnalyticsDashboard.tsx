// components/AnalyticsDashboard.tsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';

// יש לאפשר Firestore בפרויקט Firebase שלך כדי להשתמש בדשבורד זה
// דשבורד זה מניח שאתה שומר אירועי אנליטיקה ב-Firestore

const AnalyticsDashboard: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pageViews, setPageViews] = useState<any[]>([]);
    const [userSessions, setUserSessions] = useState<any[]>([]);
    const [userInteractions, setUserInteractions] = useState<any[]>([]);
    const [password, setPassword] = useState<string>('');
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const adminPassword = "your-secure-admin-password"; // החלף בסיסמה האמיתית שלך

    const handleLogin = () => {
        if (password === adminPassword) {
            setAuthenticated(true);
            localStorage.setItem('admin_authenticated', 'true');
        } else {
            alert('סיסמה שגויה');
        }
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
        setAuthenticated(isAuthenticated);

        if (isAuthenticated) {
            fetchAnalyticsData();
        }
    }, [authenticated]);

    const fetchAnalyticsData = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('מתחיל לטעון נתוני אנליטיקה מ-Firestore...');
            const db = getFirestore();

            // לוג שמסייע לבדיקה
            console.log('קישור ל-Firestore:', db);

            try {
                // בדוק אם האוסף קיים
                const testQuery = query(
                    collection(db, 'analytics_events'),
                    limit(1)
                );
                const testSnapshot = await getDocs(testQuery);
                console.log('האם הצלחנו לגשת ל-Firestore:', !testSnapshot.empty);
                console.log('מספר מסמכים שאוחזרו:', testSnapshot.size);
            } catch (testError) {
                console.error('שגיאה בבדיקת גישה ל-Firestore:', testError);
                setError('שגיאה בגישה ל-Firestore. בדוק את הגדרות ה-Firestore שלך.');
                setLoading(false);
                return;
            }

            // טען צפיות בדפים
            try {
                console.log('מנסה לטעון צפיות בדפים...');
                const pageViewsQuery = query(
                    collection(db, 'analytics_events'),
                    where('eventName', '==', 'page_visited'),
                    orderBy('timestamp', 'desc'),
                    limit(100)
                );

                const pageViewsSnapshot = await getDocs(pageViewsQuery);
                console.log('מספר צפיות בדפים שאוחזרו:', pageViewsSnapshot.size);
                const pageViewsData = pageViewsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    console.log('נתוני צפייה בדף:', data);
                    // המרת חותמות זמן של Firestore למחרוזות
                    return {
                        id: doc.id,
                        ...data,
                        timestamp: formatTimestamp(data.timestamp)
                    };
                });
                setPageViews(pageViewsData);
            } catch (pageViewsError) {
                console.error('שגיאה בטעינת צפיות בדפים:', pageViewsError);
            }

            // טען נתוני סשן
            try {
                console.log('מנסה לטעון עדכוני סשן...');
                const sessionsQuery = query(
                    collection(db, 'analytics_events'),
                    where('eventName', '==', 'session_duration_update'),
                    orderBy('timestamp', 'desc'),
                    limit(50)
                );

                const sessionsSnapshot = await getDocs(sessionsQuery);
                console.log('מספר עדכוני סשן שאוחזרו:', sessionsSnapshot.size);
                const sessionsData = sessionsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        timestamp: formatTimestamp(data.timestamp)
                    };
                });
                setUserSessions(sessionsData);
            } catch (sessionsError) {
                console.error('שגיאה בטעינת נתוני סשן:', sessionsError);
            }

            // טען אינטראקציות משתמש
            try {
                console.log('מנסה לטעון אינטראקציות משתמש...');
                const interactionsQuery = query(
                    collection(db, 'analytics_events'),
                    where('eventName', '==', 'element_clicked'),
                    orderBy('timestamp', 'desc'),
                    limit(100)
                );

                const interactionsSnapshot = await getDocs(interactionsQuery);
                console.log('מספר אינטראקציות משתמש שאוחזרו:', interactionsSnapshot.size);
                const interactionsData = interactionsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        timestamp: formatTimestamp(data.timestamp)
                    };
                });
                setUserInteractions(interactionsData);
            } catch (interactionsError) {
                console.error('שגיאה בטעינת אינטראקציות משתמש:', interactionsError);
            }

        } catch (error) {
            console.error('שגיאה בטעינת נתוני אנליטיקה:', error);
            setError('שגיאה בטעינת נתוני אנליטיקה. בדוק את הקונסולה לפרטים נוספים.');
        }
        setLoading(false);
    };

    // עוזר להמרת חותמות זמן של Firestore
    const formatTimestamp = (timestamp: any) => {
        if (!timestamp) return 'לא זמין';
        if (timestamp instanceof Timestamp) {
            return timestamp.toDate().toLocaleString();
        }
        // אם זו מחרוזת ISO, השתמש בה כפי שהיא
        if (typeof timestamp === 'string') {
            try {
                return new Date(timestamp).toLocaleString();
            } catch (e) {
                return timestamp;
            }
        }
        // עבור serverTimestamp שעדיין לא זמין
        if (timestamp && timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleString();
        }
        return 'לא זמין';
    };

    if (!authenticated) {
        return (
            <div className="p-6 max-w-4xl mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-6">דשבורד אנליטיקה</h1>
                <div className="bg-white shadow-md rounded p-6">
                    <h2 className="text-xl mb-4">התחברות מנהל</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">סיסמה</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded w-full p-2"
                            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        התחבר
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">דשבורד אנליטיקה</h1>
                <div>
                    <button
                        onClick={fetchAnalyticsData}
                        className="bg-blue-500 text-white py-1 px-3 rounded text-sm mr-2"
                    >
                        רענן נתונים
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_authenticated');
                            setAuthenticated(false);
                        }}
                        className="bg-red-500 text-white py-1 px-3 rounded text-sm"
                    >
                        התנתק
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">שגיאה! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10">טוען נתוני אנליטיקה...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* סקירת צפיות בדפים */}
                    <div className="bg-white shadow-md rounded p-6">
                        <h2 className="text-xl font-semibold mb-4">צפיות בדפים אחרונות</h2>
                        {pageViews.length === 0 ? (
                            <p className="text-gray-500">אין נתוני צפיות בדפים עדיין.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-3 text-right">דף</th>
                                        <th className="py-2 px-3 text-right">זמן</th>
                                        <th className="py-2 px-3 text-right">שפה</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {pageViews.map((view, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="py-2 px-3">{view.page || 'לא ידוע'}</td>
                                            <td className="py-2 px-3">{view.timestamp}</td>
                                            <td className="py-2 px-3">{view.language || 'לא ידוע'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* סקירת סשנים */}
                    <div className="bg-white shadow-md rounded p-6">
                        <h2 className="text-xl font-semibold mb-4">סשנים פעילים</h2>
                        {userSessions.length === 0 ? (
                            <p className="text-gray-500">אין נתוני סשן עדיין.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-3 text-right">מזהה סשן</th>
                                        <th className="py-2 px-3 text-right">משך זמן</th>
                                        <th className="py-2 px-3 text-right">עדכון אחרון</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userSessions.map((session, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="py-2 px-3">{session.sessionId?.substring(0, 8) || 'לא ידוע'}...</td>
                                            <td className="py-2 px-3">{formatDuration(session.durationSeconds || 0)}</td>
                                            <td className="py-2 px-3">{session.timestamp}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* סקירת אינטראקציות משתמש */}
                    <div className="bg-white shadow-md rounded p-6 col-span-1 md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">אינטראקציות משתמש אחרונות</h2>
                        {userInteractions.length === 0 ? (
                            <p className="text-gray-500">אין נתוני אינטראקציה עדיין.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-3 text-right">סוג</th>
                                        <th className="py-2 px-3 text-right">אלמנט</th>
                                        <th className="py-2 px-3 text-right">דף</th>
                                        <th className="py-2 px-3 text-right">זמן</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userInteractions.map((interaction, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="py-2 px-3">{interaction.elementType || 'לא ידוע'}</td>
                                            <td className="py-2 px-3">{interaction.elementText || 'לא זמין'}</td>
                                            <td className="py-2 px-3">{interaction.path || 'לא ידוע'}</td>
                                            <td className="py-2 px-3">{interaction.timestamp}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* כפתורים לייצוא נתונים */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={() => exportData('pageViews')}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-2 hover:bg-gray-300"
                    disabled={pageViews.length === 0}
                >
                    ייצוא צפיות בדפים
                </button>
                <button
                    onClick={() => exportData('userSessions')}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-2 hover:bg-gray-300"
                    disabled={userSessions.length === 0}
                >
                    ייצוא נתוני סשן
                </button>
                <button
                    onClick={() => exportData('userInteractions')}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                    disabled={userInteractions.length === 0}
                >
                    ייצוא אינטראקציות
                </button>
            </div>
        </div>
    );

    // פונקציה לייצוא נתונים
    function exportData(dataType: 'pageViews' | 'userSessions' | 'userInteractions') {
        let dataToExport;
        let filename;

        switch (dataType) {
            case 'pageViews':
                dataToExport = pageViews;
                filename = 'page-views.json';
                break;
            case 'userSessions':
                dataToExport = userSessions;
                filename = 'user-sessions.json';
                break;
            case 'userInteractions':
                dataToExport = userInteractions;
                filename = 'user-interactions.json';
                break;
        }

        // צור קובץ JSON להורדה
        const jsonStr = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // צור קישור להורדה ולחץ עליו
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

// פונקציית עזר לפורמט שניות כ-MM:SS
const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default AnalyticsDashboard;