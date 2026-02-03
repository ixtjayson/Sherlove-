
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import type { User } from './types';

// Let TypeScript know about Granim since it's loaded from a script tag
declare var Granim: any;

const App: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(storedUser as User);
        }

        // Safely initialize Granim to prevent app crash if the script fails to load.
        if (typeof Granim !== 'undefined') {
            new Granim({
                element: '#granim-canvas',
                direction: 'diagonal',
                isPausedWhenNotInView: true,
                states : {
                    "default-state": {
                        gradients: [
                            ['#FAE4E0', '#F6E9DA'],
                            ['#F5E1E1', '#FFF8F0'],
                            ['#F6E9DA', '#FAE4E0']
                        ],
                        transitionSpeed: 7000
                    }
                }
            });
        } else {
            console.warn('Granim.js script not loaded, falling back to static background.');
        }
    }, []);

    const handleLogin = (user: User) => {
        setLoggedInUser(user);
        sessionStorage.setItem('loggedInUser', user);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        sessionStorage.removeItem('loggedInUser');
    };

    return (
        <>
            <canvas id="granim-canvas"></canvas>
            <div className="min-h-screen">
                {loggedInUser ? (
                    <Dashboard user={loggedInUser} onLogout={handleLogout} />
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </>
    );
};

export default App;
