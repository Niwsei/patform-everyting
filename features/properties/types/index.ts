export type PropertyCategory = 'hotel' | 'guesthouse' | 'vacation_home' | 'apartment' | 'office';

export interface Property {
    id: string;
    title: string;
    description: string;
    pricePerMonth: number;
    location: string;
    category: PropertyCategory;
    images: string[];
    amenities: string[];
    isAvailable: boolean;
    lat?: number;
    lng?: number;
    rating?: number;
    reviewCount?: number;
    hostName?: string;
    hostImage?: string;
    isFeatured?: boolean;
    tags?: string[];
}
