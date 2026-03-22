import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await AuthService.register(req.body);
      res.status(201).json({
        status: 'success',
        data: { user, token }
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await AuthService.login(req.body);
      res.status(200).json({
        status: 'success',
        data: { user, token }
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req: any, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        status: 'success',
        data: { user: req.user }
      });
    } catch (error) {
      next(error);
    }
  }
}
