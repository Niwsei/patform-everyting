export type ServiceCategory = 'moving' | 'delivery' | 'express' | 'storage';

export interface ServiceProvider {
    id: string;
    name: string;
    category: ServiceCategory;
    description: string;
    basePrice: number;
    rating: number;
    reviewCount: number;
    logo: string;
    isVerified: boolean;
    features: string[];
}
