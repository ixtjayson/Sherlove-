
import React, { useState, useEffect } from 'react';
import type { Photo } from '../types';

interface SlideshowProps {
    photos: Photo[];
}

const Slideshow: React.FC<SlideshowProps> = ({ photos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (photos.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [photos.length]);

    if (photos.length === 0) {
        return null;
    }
    
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === photos.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl shadow-rose-300/50 mt-4 group">
            {photos.map((photo, index) => (
                <div
                    key={photo.id}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={`data:image/jpeg;base64,${photo.base64}`}
                        alt={`Memory uploaded by ${photo.uploadedBy}`}
                        className="w-full h-full object-cover"
                    />
                     <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent">
                        <p className="text-white/80 text-center text-xs">Uploaded by {photo.uploadedBy}</p>
                    </div>
                </div>
            ))}
            
            <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 text-gray-800 rounded-full p-2 hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:outline-none z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 text-gray-800 rounded-full p-2 hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:outline-none z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {photos.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slideshow;