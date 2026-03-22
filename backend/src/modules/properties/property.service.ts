import prisma from '@/shared/database';
import { NotFoundError } from '@/core/errors';

export class PropertyService {
  static async getAll(filters: any) {
    const {
      category, minPrice, maxPrice, location, search, sort
    } = filters;

    const where: any = {
      isVerified: true // Only verified properties in public registry
    };

    if (category) where.category = category;
    if (minPrice || maxPrice) {
      where.pricePerMonth = {};
      if (minPrice) where.pricePerMonth.gte = parseFloat(minPrice);
      if (maxPrice) where.pricePerMonth.lte = parseFloat(maxPrice);
    }
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { pricePerMonth: 'asc' };
    else if (sort === 'price_desc') orderBy = { pricePerMonth: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };

    return prisma.property.findMany({
      where,
      orderBy,
      include: {
        host: {
          select: { name: true, avatar: true, isVerified: true }
        }
      }
    });
  }

  static async getById(id: string) {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        host: { select: { name: true, avatar: true, isVerified: true } },
        units: true
      }
    });

    if (!property) throw new NotFoundError('Property asset not found in registry.');
    return property;
  }

  static async create(hostId: string, data: any) {
    return prisma.property.create({
      data: {
        ...data,
        hostId
      }
    });
  }
}
