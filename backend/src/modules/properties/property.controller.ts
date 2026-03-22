import { Request, Response, NextFunction } from 'express';
import { PropertyService } from './property.service';
import { AuthRequest } from '@/middlewares/auth.middleware';

export class PropertyController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const properties = await PropertyService.getAll(req.query);
      res.status(200).json({
        status: 'success',
        results: properties.length,
        data: { properties }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const property = await PropertyService.getById(id);
      res.status(200).json({
        status: 'success',
        data: { property }
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const property = await PropertyService.create(req.user!.id, req.body);
      res.status(201).json({
        status: 'success',
        data: { property }
      });
    } catch (error) {
      next(error);
    }
  }
}
