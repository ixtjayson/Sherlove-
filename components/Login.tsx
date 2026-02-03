
import React, { useState } from 'react';
import { verifyPassword } from '../services/authService';
import type { User } from '../types';
import { HeartIcon } from './icons/HeartIcon';

interface LoginProps {
    onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // The password verification is now synchronous.
        const user = verifyPassword(password);
        
        // A small delay to simulate the "unlocking" feel.
        setTimeout(() => {
            if (user) {
                onLogin(user);
            } else {
                setError('The key to our world is incorrect. Try again, my love.');
                setIsLoading(false);
            }
        }, 500);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-rose-200/50">
                <div className="text-center">
                    <HeartIcon className="w-16 h-16 mx-auto text-rose-400" />
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-800">
                        Our Secret World
                    </h1>
                    <p className="mt-2 text-gray-600">For Jayson & Sherlyn's eyes only</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="password-input" className="sr-only">Password</label>
                            <input
                                id="password-input"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-rose-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your secret key"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    
                    <div className="text-center text-xs text-gray-500 !mt-4">
                        <p>Hint: Your name is the key, and it's case-sensitive!</p>
                        <p className="mt-1">Jayson's key is <code className="font-mono bg-rose-100 text-rose-700 p-1 rounded">Jayson</code></p>
                        <p>Sherlyn's key is <code className="font-mono bg-rose-100 text-rose-700 p-1 rounded">sherlyn</code></p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-300 disabled:bg-rose-300"
                        >
                            {isLoading ? 'Unlocking...' : 'Enter Our World'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
