import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email protocol.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    name: z.string().min(2, 'Name is required.'),
    role: z.enum(['USER', 'HOST', 'PARTNER']).optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email protocol.'),
    password: z.string()
  })
});
