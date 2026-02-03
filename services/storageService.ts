
import type { Photo } from '../types';

const STORAGE_KEY = 'loveGalleryPhotos';

export const getPhotosFromStorage = (): Photo[] => {
    try {
        const storedPhotos = localStorage.getItem(STORAGE_KEY);
        return storedPhotos ? JSON.parse(storedPhotos) : [];
    } catch (error) {
        console.error("Failed to parse photos from localStorage", error);
        return [];
    }
};

export const savePhotosToStorage = (photos: Photo[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (error) {
        console.error("Failed to save photos to localStorage", error);
    }
};
