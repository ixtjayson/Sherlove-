
import React from 'react';
import type { User } from '../types';
import { HeartIcon } from './icons/HeartIcon';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    const otherUser = user === 'Jayson' ? 'Sherlyn' : 'Jayson';

    return (
        <header className="bg-white/60 backdrop-blur-lg shadow-md shadow-rose-200/50 sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-2">
                        <HeartIcon className="h-8 w-8 text-rose-500" />
                        <span className="text-xl font-semibold font-serif text-gray-700">
                            Jayson <span className="text-rose-400">&</span> Sherlyn
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="hidden sm:block">
                            Welcome, <span className="font-bold text-rose-600">{user}</span>! I love you, {otherUser}.
                        </p>
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 text-sm font-medium text-rose-600 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
