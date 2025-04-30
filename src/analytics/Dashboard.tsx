import React, { useState, useEffect } from 'react';
import './Dashboard.css';

interface Location {
    country?: string;
    region?: string;
    city?: string;
}

interface PageView {
    id: string;
    site_id: string;
    timestamp: number;
    path: string;
    referrer: string;
    user_agent: string;
    screen_size: {
        width: number;
        height: number;
    };
    language: string;
    time_zone: string;
    session_id: string;
    time_spent?: number;
    ip?: string;
    location?: Location;
    created_at: string;
}

interface Session {
    id: string;
    views: PageView[];
    firstVisit: number;
    lastVisit: number;
    totalTimeSpent: number;
    pagesViewed: string[];
}

interface DashboardProps {
    apiEndpoint: string;
    siteId: string;
    apiKey: string;
}

export const AnalyticsDashboard: React.FC<DashboardProps> = ({ apiEndpoint, siteId, apiKey }) => {
    const [pageViews, setPageViews] = useState<PageView[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'raw' | 'sessions'>('sessions');
    const [timeRange, setTimeRange] = useState<number>(7); // ימים אחרונים

    // פונקציה לטעינת הנתונים
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiEndpoint}/analytics/${siteId}`, {
                headers: {
                    'X-API-Key': apiKey,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch analytics data');
            }

            const result = await response.json();
            const views: PageView[] = result.data;

            // מיון לפי זמן
            const sortedViews = views.sort((a, b) => a.timestamp - b.timestamp);
            setPageViews(sortedViews);

            // עיבוד הנתונים לפי סשנים
            processSessions(sortedViews);
            setLoading(false);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    // עיבוד הנתונים לפי סשנים
    const processSessions = (views: PageView[]) => {
        const sessionMap = new Map<string, Session>();

        views.forEach(view => {
            // יצירת או עדכון הסשן
            if (!sessionMap.has(view.session_id)) {
                sessionMap.set(view.session_id, {
                    id: view.session_id,
                    views: [],
                    firstVisit: view.timestamp,
                    lastVisit: view.timestamp,
                    totalTimeSpent: 0,
                    pagesViewed: [],
                });
            }

            const session = sessionMap.get(view.session_id)!;
            session.views.push(view);
            session.lastVisit = Math.max(session.lastVisit, view.timestamp);

            if (view.time_spent) {
                session.totalTimeSpent += view.time_spent;
            }

            if (!session.pagesViewed.includes(view.path)) {
                session.pagesViewed.push(view.path);
            }
        });

        const sessionArray = Array.from(sessionMap.values());
        // מיון לפי זמן ביקור אחרון
        sessionArray.sort((a, b) => b.lastVisit - a.lastVisit);
        setSessions(sessionArray);
    };

    // טעינת הנתונים בעת טעינת הדף
    useEffect(() => {
        fetchData();
        // טעינת הנתונים כל 5 דקות
        const interval = setInterval(fetchData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [apiEndpoint, siteId, apiKey]);

    // פונקציה להצגת תאריך וזמן
    const formatDateTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleString();
    };

    // פונקציה להצגת משך זמן
    const formatDuration = (milliseconds?: number) => {
        if (!milliseconds) return 'N/A';
        const seconds = Math.floor(milliseconds / 1000);
        if (seconds < 60) return `${seconds} שניות`;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} דקות, ${remainingSeconds} שניות`;
    };

    // פונקציה לקבלת מידע על הדפדפן מתוך User Agent
    const getBrowserInfo = (userAgent: string) => {
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'Internet Explorer';
        return 'אחר';
    };

    // פונקציה לקבלת מידע על מערכת ההפעלה מתוך User Agent
    const getOSInfo = (userAgent: string) => {
        if (userAgent.includes('Windows')) return 'Windows';
        if (userAgent.includes('Mac OS')) return 'macOS';
        if (userAgent.includes('iPhone')) return 'iOS';
        if (userAgent.includes('iPad')) return 'iPadOS';
        if (userAgent.includes('Android')) return 'Android';
        if (userAgent.includes('Linux')) return 'Linux';
        return 'אחר';
    };

    // פונקציה לסינון לפי טווח זמן
    const filterByTimeRange = (timestamp: number) => {
        const now = Date.now();
        const rangeMs = timeRange * 24 * 60 * 60 * 1000; // המרה לאלפיות שנייה
        return timestamp >= (now - rangeMs);
    };

    // סינון הנתונים לפי טווח הזמן הנבחר
    const filteredPageViews = pageViews.filter(view => filterByTimeRange(view.timestamp));
    const filteredSessions = sessions.filter(session => filterByTimeRange(session.lastVisit));

    if (loading) return <div>טוען נתונים...</div>;
    if (error) return <div>שגיאה: {error}</div>;

    return (
        <div className="analytics-dashboard">
            <h1>דאשבורד אנליטיקס</h1>

            <div className="dashboard-controls">
                <div>
                    <label>סינון לפי: </label>
                    <select value={timeRange} onChange={(e) => setTimeRange(parseInt(e.target.value))}>
                        <option value={1}>24 שעות אחרונות</option>
                        <option value={7}>7 ימים אחרונים</option>
                        <option value={30}>30 ימים אחרונים</option>
                        <option value={90}>3 חודשים אחרונים</option>
                    </select>
                </div>

                <div>
                    <button
                        className={viewMode === 'sessions' ? 'active' : ''}
                        onClick={() => setViewMode('sessions')}
                    >
                        סשנים
                    </button>
                    <button
                        className={viewMode === 'raw' ? 'active' : ''}
                        onClick={() => setViewMode('raw')}
                    >
                        צפיות גולמיות
                    </button>
                </div>

                <button onClick={fetchData}>רענן נתונים</button>
            </div>

            <div className="stats-summary">
                <div className="stat-box">
                    <h3>סך הביקורים</h3>
                    <p>{filteredSessions.length}</p>
                </div>
                <div className="stat-box">
                    <h3>סך צפיות בדפים</h3>
                    <p>{filteredPageViews.length}</p>
                </div>
                <div className="stat-box">
                    <h3>דפים פופולריים</h3>
                    <ul>
                        {Array.from(new Set(filteredPageViews.map(view => view.path)))
                            .slice(0, 3)
                            .map(path => (
                                <li key={path}>{path}</li>
                            ))}
                    </ul>
                </div>
            </div>

            {viewMode === 'sessions' ? (
                <div className="sessions-container">
                    <h2>סשנים ({filteredSessions.length})</h2>
                    {filteredSessions.length === 0 ? (
                        <p>אין נתונים זמינים לטווח הזמן הנבחר</p>
                    ) : (
                        <table className="sessions-table">
                            <thead>
                            <tr>
                                <th>מזהה סשן</th>
                                <th>זמן התחלה</th>
                                <th>זמן סיום</th>
                                <th>משך הסשן</th>
                                <th>דפים שנצפו</th>
                                <th>מיקום</th>
                                <th>דפדפן</th>
                                <th>מערכת הפעלה</th>
                                <th>פעולות</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredSessions.map(session => {
                                const firstView = session.views[0];
                                // const lastView = session.views[session.views.length - 1];

                                return (
                                    <tr key={session.id}>
                                        <td>{session.id.substring(0, 8)}...</td>
                                        <td>{formatDateTime(session.firstVisit)}</td>
                                        <td>{formatDateTime(session.lastVisit)}</td>
                                        <td>{formatDuration(session.totalTimeSpent)}</td>
                                        <td>{session.pagesViewed.length}</td>
                                        <td>
                                            {firstView.location ?
                                                `${firstView.location.country || ''} ${firstView.location.city || ''}` :
                                                'לא זמין'}
                                        </td>
                                        <td>{getBrowserInfo(firstView.user_agent)}</td>
                                        <td>{getOSInfo(firstView.user_agent)}</td>
                                        <td>
                                            <button onClick={() => alert(JSON.stringify(session, null, 2))}>
                                                פרטים
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    )}
                </div>
            ) : (
                <div className="pageviews-container">
                    <h2>צפיות בדפים ({filteredPageViews.length})</h2>
                    {filteredPageViews.length === 0 ? (
                        <p>אין נתונים זמינים לטווח הזמן הנבחר</p>
                    ) : (
                        <table className="pageviews-table">
                            <thead>
                            <tr>
                                <th>זמן</th>
                                <th>נתיב</th>
                                <th>מקור</th>
                                <th>IP</th>
                                <th>מיקום</th>
                                <th>זמן שהייה</th>
                                <th>דפדפן</th>
                                <th>מסך</th>
                                <th>מזהה סשן</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredPageViews.map(view => (
                                <tr key={view.id}>
                                    <td>{formatDateTime(view.timestamp)}</td>
                                    <td>{view.path}</td>
                                    <td>{view.referrer === 'direct' ? 'ישיר' : view.referrer}</td>
                                    <td>{view.ip || 'לא זמין'}</td>
                                    <td>
                                        {view.location ?
                                            `${view.location.country || ''} ${view.location.city || ''}` :
                                            'לא זמין'}
                                    </td>
                                    <td>{formatDuration(view.time_spent)}</td>
                                    <td>{getBrowserInfo(view.user_agent)}</td>
                                    <td>{`${view.screen_size.width}x${view.screen_size.height}`}</td>
                                    <td>{view.session_id.substring(0, 8)}...</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};