
export type User = 'Jayson' | 'Sherlyn';

export interface Photo {
  id: string;
  base64: string;
  uploadedBy: User;
}

export interface DateIdea {
    title: string;
    description: string;
}