export interface Property {
    id: string;
    title: string;
    description: string;
    pricePerMonth: number;
    location: string;
    images: string[];
    amenities: string[];
    isAvailable: boolean;
    lat?: number;
    lng?: number;
    rating?: number;
    reviewCount?: number;
    hostName?: string;
    hostImage?: string;
}
