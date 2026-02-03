
import React, { useState, useEffect } from 'react';
import { generateDateIdeas } from '../services/geminiService';
import type { DateIdea } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

const Events: React.FC = () => {
    const [ideas, setIdeas] = useState<DateIdea[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const startDate = new Date('2025-09-04T00:00:00Z');
    
    const calculateDuration = () => {
        const now = new Date();
        if (now < startDate) {
            return { years: 0, months: 0, days: 0, future: true };
        }
        const diff = Math.abs(now.getTime() - startDate.getTime());
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * (365.25 / 12)));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24));
        return { years, months, days, future: false };
    };
    
    const [duration, setDuration] = useState(calculateDuration());

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(calculateDuration());
        }, 1000 * 60 * 60); // Update once an hour
        return () => clearInterval(interval);
    }, []);

    const fetchDateIdeas = async () => {
        setIsLoading(true);
        const newIdeas = await generateDateIdeas();
        setIdeas(newIdeas);
        setIsLoading(false);
    };

    const renderDuration = () => {
        if (duration.future) {
            return <p className="font-semibold text-rose-800">Our story is about to begin!</p>
        }
        return <p className="font-semibold text-rose-800">{duration.years}y, {duration.months}m, {duration.days}d</p>
    }

    return (
        <div className="p-6 bg-white/70 rounded-2xl shadow-lg shadow-rose-200/50 backdrop-blur-md h-full">
            <h2 className="text-2xl font-bold font-serif text-gray-800 mb-4">Our Love Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-center">
                <div className="p-4 bg-rose-100/50 rounded-lg">
                    <p className="text-sm text-gray-500">When It Started</p>
                    <p className="font-semibold text-rose-800">{startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                 <div className="p-4 bg-rose-100/50 rounded-lg">
                    <p className="text-sm text-gray-500">Together For</p>
                    {renderDuration()}
                </div>
            </div>
            
            <h3 className="text-xl font-bold font-serif text-gray-700 mb-2">AI-Powered Date Ideas</h3>
            <div className="space-y-3">
                {ideas.length > 0 && ideas.map((idea, index) => (
                    <div key={index} className="p-3 bg-white/80 rounded-lg">
                        <p className="font-semibold text-rose-700">{idea.title}</p>
                        <p className="text-sm text-gray-600">{idea.description}</p>
                    </div>
                ))}
            </div>
             <button
                onClick={fetchDateIdeas}
                disabled={isLoading}
                className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors disabled:bg-rose-300"
            >
                <SparklesIcon className="w-5 h-5 mr-2" />
                {isLoading ? 'Dreaming up ideas...' : 'Inspire Our Next Date'}
            </button>
        </div>
    );
};

export default Events;
