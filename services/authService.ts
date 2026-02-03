
import type { User } from '../types';

// The previous hashing system was flawed and has been removed.
// This new system is simple, direct, and reliable for our private world.

export const verifyPassword = (password: string): User | null => {
    // A simple, case-sensitive check for the secret keys.
    if (password === 'Jayson') {
        return 'Jayson';
    }
    if (password === 'sherlyn') {
        return 'Sherlyn';
    }
    return null;
};
