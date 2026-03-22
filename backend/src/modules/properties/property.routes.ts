import { Router } from 'express';
import { PropertyController } from './property.controller';
import { validate } from '@/middlewares/validate.middleware';
import { createPropertySchema, propertyQuerySchema } from './property.schema';
import { protect, restrictTo } from '@/middlewares/auth.middleware';

const router = Router();

/**
 * @route GET /api/v1/properties
 * @desc  Fetch all verified property assets
 */
router.get('/', validate(propertyQuerySchema), PropertyController.list);

/**
 * @route GET /api/v1/properties/:id
 * @desc  Fetch single asset manifest
 */
router.get('/:id', PropertyController.getOne);

/**
 * @route POST /api/v1/properties
 * @desc  Ingest new property asset (Host only)
 */
router.post(
  '/',
  protect,
  restrictTo('HOST', 'ADMIN'),
  validate(createPropertySchema),
  PropertyController.create
);

export default router;
