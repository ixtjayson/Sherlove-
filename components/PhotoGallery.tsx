
import React, { useState, useEffect } from 'react';
import { getPhotosFromStorage, savePhotosToStorage } from '../services/storageService';
import type { Photo, User } from '../types';
import PhotoUploader from './PhotoUploader';
import Slideshow from './Slideshow';
import { ImageIcon } from './icons/ImageIcon';

interface PhotoGalleryProps {
    currentUser: User;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ currentUser }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadedPhotos = getPhotosFromStorage();
        setPhotos(loadedPhotos);
        setIsLoading(false);
    }, []);

    const handleNewPhotos = (newPhotos: Photo[]) => {
        const updatedPhotos = [...photos, ...newPhotos];
        setPhotos(updatedPhotos);
        savePhotosToStorage(updatedPhotos);
    };
    
    return (
        <div className="p-6 bg-white/70 rounded-2xl shadow-lg shadow-rose-200/50 backdrop-blur-md">
            <h2 className="text-3xl font-bold font-serif text-gray-800 mb-4">Our Memories</h2>
            <PhotoUploader onUpload={handleNewPhotos} currentUser={currentUser} />
            
            {isLoading ? (
                <div className="text-center p-8 text-gray-500">Loading memories...</div>
            ) : photos.length > 0 ? (
                <Slideshow photos={photos} />
            ) : (
                <div className="text-center p-8 mt-4 border-2 border-dashed border-rose-200 rounded-lg">
                    <ImageIcon className="w-12 h-12 mx-auto text-rose-300" />
                    <p className="mt-2 text-gray-500">No photos yet. Let's add our first memory!</p>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;