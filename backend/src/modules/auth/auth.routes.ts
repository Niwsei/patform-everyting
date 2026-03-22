import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '@/middlewares/validate.middleware';
import { registerSchema, loginSchema } from './auth.schema';
import { protect } from '@/middlewares/auth.middleware';

const router = Router();

/**
 * @route POST /api/v1/auth/register
 * @desc  Register new user/host node
 */
router.post('/register', validate(registerSchema), AuthController.register);

/**
 * @route POST /api/v1/auth/login
 * @desc  Authenticate and issue JWT
 */
router.post('/login', validate(loginSchema), AuthController.login);

/**
 * @route GET /api/v1/auth/me
 * @desc  Fetch current session metadata
 */
router.get('/me', protect, AuthController.me);

export default router;
