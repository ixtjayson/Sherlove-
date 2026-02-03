
import React, { useState } from 'react';
import type { Photo, User } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface PhotoUploaderProps {
    onUpload: (photos: Photo[]) => void;
    currentUser: User;
}

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const [mimePart, base64Part] = result.split(',');
            if (!base64Part) {
                reject(new Error('Invalid file format'));
                return;
            }
            const mimeType = mimePart.split(':')[1].split(';')[0];
            resolve({ base64: base64Part, mimeType });
        };
        reader.onerror = error => reject(error);
    });
};

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onUpload, currentUser }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);

        const newPhotos: Photo[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                const { base64 } = await fileToBase64(file);
                newPhotos.push({
                    id: `${Date.now()}-${i}`,
                    base64,
                    uploadedBy: currentUser,
                });
                setUploadProgress(Math.round(((i + 1) / files.length) * 100));
            } catch (error) {
                console.error('Error processing file:', error);
            }
        }

        onUpload(newPhotos);
        setIsUploading(false);
    };

    return (
        <div className="mb-6">
            <label htmlFor="photo-upload" className="w-full cursor-pointer bg-rose-100 hover:bg-rose-200 transition-colors text-rose-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center border-2 border-dashed border-rose-300">
                <UploadIcon className="w-5 h-5 mr-2" />
                <span>Add New Memories</span>
            </label>
            <input
                id="photo-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
            />
            {isUploading && (
                <div className="mt-4">
                    <p className="text-sm text-center text-gray-600 mb-1">Uploading memories... ({uploadProgress}%)</p>
                    <div className="w-full bg-rose-200 rounded-full h-2.5">
                        <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoUploader;