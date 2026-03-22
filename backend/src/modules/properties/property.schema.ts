import { z } from 'zod';

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title protocol requires at least 5 characters.'),
    description: z.string().min(20, 'Description requires detailed manifest.'),
    pricePerMonth: z.number().positive(),
    location: z.string(),
    category: z.string(),
    images: z.array(z.string()).min(1),
    amenities: z.array(z.string()),
    tags: z.array(z.string()).optional()
  })
});

export const propertyQuerySchema = z.object({
  query: z.object({
    category: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    location: z.string().optional(),
    search: z.string().optional(),
    sort: z.enum(['price_asc', 'price_desc', 'newest', 'rating']).optional()
  })
});
