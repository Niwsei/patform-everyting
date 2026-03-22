import { Router } from 'express';
import authRoutes from '@/modules/auth/auth.routes';
import propertyRoutes from '@/modules/properties/property.routes';

const router = Router();

// Version 1 API Routes
router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);

export default router;
