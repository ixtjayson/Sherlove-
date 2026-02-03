import React, { useState, useEffect } from 'react';
import { CalendarIcon } from './icons/CalendarIcon';

const Countdown: React.FC = () => {
    const calculateTimeLeft = () => {
        const now = new Date();
        let targetDate = new Date(now.getFullYear(), now.getMonth(), 4);

        if (now.getDate() > 4) {
            targetDate.setMonth(targetDate.getMonth() + 1);
        } else if (now.getDate() === 4 && now.getHours() >= 0) { // If it's the 4th, target next month
             if(now.getHours() > 0 || now.getMinutes() > 0 || now.getSeconds() > 0){
                targetDate.setMonth(targetDate.getMonth() + 1);
             }
        }
        
        const difference = +targetDate - +now;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return {timeLeft, targetDate};
    };

    const [{timeLeft, targetDate}, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    // FIX: Replaced `JSX.Element` with `React.ReactElement` to resolve the "Cannot find namespace 'JSX'" error.
    const timerComponents: React.ReactElement[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval as keyof typeof timeLeft] && interval !== 'seconds' && Object.keys(timeLeft).some(k => timeLeft[k as keyof typeof timeLeft] > 0)) {
            // don't push 0 values unless it's seconds or the only value
        }
         timerComponents.push(
            <div key={interval} className="text-center">
                <div className="text-4xl font-bold text-rose-600">{String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}</div>
                <div className="text-xs uppercase text-gray-500">{interval}</div>
            </div>
        );
    });

    return (
        <div className="p-6 bg-white/70 rounded-2xl shadow-lg shadow-rose-200/50 backdrop-blur-md h-full flex flex-col">
             <h2 className="text-2xl font-bold font-serif text-gray-800 mb-4">Our Next Milestone</h2>
             <div className="flex-grow flex flex-col items-center justify-center">
                <div className="flex space-x-4">
                    {timerComponents.length ? timerComponents : <span>Happy Monthsary!</span>}
                </div>
                <div className="mt-4 flex items-center space-x-2 text-gray-600 bg-rose-100 px-3 py-1 rounded-full text-sm">
                    <CalendarIcon className="w-4 h-4 text-rose-500" />
                    <span>{targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
             </div>
        </div>
    );
};

export default Countdown;