export interface Property {
    id: string;
    title: string;
    description: string;
    pricePerMonth: number;
    location: string;
    images: string[];
    amenities: string[];
    isAvailable: boolean;
}