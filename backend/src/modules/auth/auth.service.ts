import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import prisma from '@/shared/database';
import { ConflictError, UnauthorizedError } from '@/core/errors';
import { RegisterDTO, LoginDTO } from './auth.types';

export class AuthService {
  private static readonly saltRounds = Number(process.env.BCRYPT_SALT) || 12;

  static async register(data: RegisterDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) throw new ConflictError('Email already registered in central registry.');

    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=4f46e5&color=fff`
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true
      }
    });

    const token = this.signToken(user.id);
    return { user, token };
  }

  static async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedError('Invalid credentials or protocol sequence.');
    }

    const token = this.signToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        points: user.points
      },
      token
    };
  }

  private static signToken(id: string) {
    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d'
    };
    return jwt.sign({ id }, process.env.JWT_SECRET!, options);
  }
}
