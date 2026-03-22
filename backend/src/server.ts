import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@/shared/swagger';
import apiRouter from '@/shared/routes';

dotenv.config();

const app: Application = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false // Disable for Swagger UI to work correctly in dev
}));
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// API Routes
app.use('/api/v1', apiRouter);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

export default app;
