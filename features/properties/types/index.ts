export type PropertyCategory = 'hotel' | 'guesthouse' | 'vacation_home' | 'apartment' | 'office';

export interface PropertyUnit {
    id: string;
    unitNumber: string;
    floor?: number;
    sizeSqM?: number;
    status: 'available' | 'occupied' | 'reserved' | 'maintenance';
    priceOverride?: number;
    features?: string[];
}

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
    units?: PropertyUnit[];
}
