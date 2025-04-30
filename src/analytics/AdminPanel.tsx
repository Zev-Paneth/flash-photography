import { useState, useEffect } from 'react';
import { AnalyticsDashboard } from './Dashboard.tsx'

function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // בדיקת אימות (באמצעות localStorage - בסיסי)
    useEffect(() => {
        const isAuth = localStorage.getItem('admin_authenticated') === 'true';
        setIsAuthenticated(isAuth);
    }, []);

    // פונקציית אימות
    const login = () => {
        // החלף זאת במנגנון אימות מאובטח יותר במערכת אמיתית
        const adminPassword = 'your-admin-password';
        if (password === adminPassword) {
            setIsAuthenticated(true);
            localStorage.setItem('admin_authenticated', 'true');
        } else {
            alert('סיסמה שגויה');
        }
    };

    // תצוגת מסך התחברות
    if (!isAuthenticated) {
        return (
            <div className="admin-login" style={{ textAlign: 'center', maxWidth: '300px', margin: '100px auto' }}>
                <h1>כניסת מנהל</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="הזן סיסמה"
                    style={{ margin: '10px 0', padding: '8px', width: '100%' }}
                />
                <button
                    onClick={login}
                    style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    התחבר
                </button>
            </div>
        );
    }

    // תצוגת לוח הבקרה
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                <h1>פאנל ניהול</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem('admin_authenticated');
                        setIsAuthenticated(false);
                    }}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    התנתק
                </button>
            </div>

            <AnalyticsDashboard
                apiEndpoint="https://your-api-endpoint.com" // שנה לכתובת השרת שלך
                siteId="portfolio-site" // שנה לזיהוי האתר שלך
                apiKey="your-secure-api-key" // שנה למפתח ה-API שהגדרת בשרת
            />
        </div>
    );
}

export default AdminPanel;