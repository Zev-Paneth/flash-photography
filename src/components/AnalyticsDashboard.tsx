// components/AnalyticsDashboard.tsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

// You'll need to enable Firestore in your Firebase project to use this dashboard
// This dashboard assumes you're storing analytics events in Firestore

const AnalyticsDashboard: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [pageViews, setPageViews] = useState<any[]>([]);
    const [userSessions, setUserSessions] = useState<any[]>([]);
    const [userInteractions, setUserInteractions] = useState<any[]>([]);
    const [password, setPassword] = useState<string>('');
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const adminPassword = "your-secure-admin-password"; // Replace with your actual password

    const handleLogin = () => {
        if (password === adminPassword) {
            setAuthenticated(true);
            localStorage.setItem('admin_authenticated', 'true');
        } else {
            alert('Incorrect password');
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
        try {
            const db = getFirestore();

            // Fetch page views
            const pageViewsQuery = query(
                collection(db, 'analytics_events'),
                where('eventName', '==', 'page_visited'),
                orderBy('timestamp', 'desc'),
                limit(100)
            );

            const pageViewsSnapshot = await getDocs(pageViewsQuery);
            const pageViewsData = pageViewsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPageViews(pageViewsData);

            // Fetch user sessions
            const sessionsQuery = query(
                collection(db, 'analytics_events'),
                where('eventName', '==', 'session_duration_update'),
                orderBy('timestamp', 'desc'),
                limit(50)
            );

            const sessionsSnapshot = await getDocs(sessionsQuery);
            const sessionsData = sessionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUserSessions(sessionsData);

            // Fetch user interactions
            const interactionsQuery = query(
                collection(db, 'analytics_events'),
                where('eventName', '==', 'element_clicked'),
                orderBy('timestamp', 'desc'),
                limit(100)
            );

            const interactionsSnapshot = await getDocs(interactionsQuery);
            const interactionsData = interactionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUserInteractions(interactionsData);

        } catch (error) {
            console.error('Error fetching analytics data:', error);
        }
        setLoading(false);
    };

    if (!authenticated) {
        return (
            <div className="p-6 max-w-4xl mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
                <div className="bg-white shadow-md rounded p-6">
                    <h2 className="text-xl mb-4">Admin Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem('admin_authenticated');
                        setAuthenticated(false);
                    }}
                    className="bg-red-500 text-white py-1 px-3 rounded text-sm"
                >
                    Logout
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading analytics data...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Page Views Section */}
                    <div className="bg-white shadow-md rounded p-6">
                        <h2 className="text-xl font-semibold mb-4">Recent Page Views</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-3 text-left">Page</th>
                                    <th className="py-2 px-3 text-left">Time</th>
                                    <th className="py-2 px-3 text-left">Language</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pageViews.map((view, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="py-2 px-3">{view.page}</td>
                                        <td className="py-2 px-3">{new Date(view.timestamp).toLocaleString()}</td>
                                        <td className="py-2 px-3">{view.language}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* User Sessions Section */}
                    <div className="bg-white shadow-md rounded p-6">
                        <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-3 text-left">Session ID</th>
                                    <th className="py-2 px-3 text-left">Duration</th>
                                    <th className="py-2 px-3 text-left">Last Update</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userSessions.map((session, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="py-2 px-3">{session.sessionId.substring(0, 8)}...</td>
                                        <td className="py-2 px-3">{formatDuration(session.durationSeconds)}</td>
                                        <td className="py-2 px-3">{new Date(session.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* User Interactions Section */}
                    <div className="bg-white shadow-md rounded p-6 col-span-1 md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">Recent User Interactions</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-3 text-left">Type</th>
                                    <th className="py-2 px-3 text-left">Element</th>
                                    <th className="py-2 px-3 text-left">Page</th>
                                    <th className="py-2 px-3 text-left">Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userInteractions.map((interaction, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="py-2 px-3">{interaction.elementType}</td>
                                        <td className="py-2 px-3">{interaction.elementText || 'N/A'}</td>
                                        <td className="py-2 px-3">{interaction.path}</td>
                                        <td className="py-2 px-3">{new Date(interaction.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper function to format seconds as MM:SS
const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default AnalyticsDashboard;