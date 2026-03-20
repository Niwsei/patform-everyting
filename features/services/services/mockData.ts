import { ServiceProvider } from '../types';

export const mockServiceProviders: ServiceProvider[] = [
  {
    id: 'ser-001',
    name: 'Vientiane Move Pro',
    category: 'moving',
    description: 'Expert home and office moving services. We handle your belongings with care.',
    basePrice: 500000,
    rating: 4.9,
    reviewCount: 128,
    logo: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=200&auto=format&fit=crop',
    isVerified: true,
    features: ['Professional Staff', 'Insurance Included', 'Packing Service'],
  },
  {
    id: 'ser-002',
    name: 'Flash Express VTE',
    category: 'express',
    description: 'Fastest delivery within the city. Pick up within 30 minutes.',
    basePrice: 25000,
    rating: 4.7,
    reviewCount: 2450,
    logo: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=200&auto=format&fit=crop',
    isVerified: true,
    features: ['Instant Pickup', 'App Tracking', 'Affordable'],
  },
  {
    id: 'ser-003',
    name: 'Lao Logistics Hub',
    category: 'storage',
    description: 'Secure storage units for long-term or short-term needs.',
    basePrice: 1000000,
    rating: 4.5,
    reviewCount: 42,
    logo: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=200&auto=format&fit=crop',
    isVerified: true,
    features: ['24/7 Access', 'CCTV Security', 'Climate Control'],
  }
];
