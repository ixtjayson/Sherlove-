
import React from 'react';
import type { User } from '../types';
import Header from './Header';
import Countdown from './Countdown';
import Events from './Events';
import PhotoGallery from './PhotoGallery';

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header user={user} onLogout={onLogout} />
            <main className="flex-grow container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-3">
                        <PhotoGallery currentUser={user} />
                    </div>
                    <div className="lg:col-span-1">
                        <Countdown />
                    </div>
                    <div className="lg:col-span-2">
                        <Events />
                    </div>
                </div>
            </main>
            <footer className="text-center p-4 text-rose-500 text-sm">
                <p>Made with ❤️ for my one and only.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
