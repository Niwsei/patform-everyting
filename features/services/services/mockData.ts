import { ServiceProvider } from '../types';

export const mockServiceProviders: ServiceProvider[] = [
  {
    id: 'ser-001',
    name: 'Vientiane Move Pro',
    category: 'moving',
    description: 'บริการขนย้ายบ้านและสำนักงานโดยมืออาชีพ เราดูแลสิ่งของของคุณด้วยความระมัดระวังสูงสุด',
    basePrice: 500000,
    rating: 4.9,
    reviewCount: 128,
    logo: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=200&auto=format&fit=crop',
    isVerified: true,
    features: ['พนักงานมืออาชีพ', 'มีประกันสิ่งของ', 'บริการแพ็คของ'],
  },
  {
    id: 'ser-002',
    name: 'Flash Express VTE',
    category: 'express',
    description: 'บริการรับส่งพัสดุด่วนที่สุดในเมือง รับของภายใน 30 นาที',
    basePrice: 25000,
    rating: 4.7,
    reviewCount: 2450,
    logo: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=200&auto=format&fit=crop',
    isVerified: true,
    features: ['รับของทันที', 'ติดตามผ่านแอป', 'ราคาประหยัด'],
  },
  {
    id: 'ser-003',
    name: 'Lao Logistics Hub',
    category: 'storage',
    description: 'บริการคลังสินค้าที่ปลอดภัยสำหรับความต้องการระยะยาวหรือระยะสั้น',
    basePrice: 1000000,
    rating: 4.5,
    reviewCount: 42,
    logo: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=200&auto=format&fit=crop',
    isVerified: true,
    features: ['เข้าออกได้ 24/7', 'รปภ. และ CCTV', 'ห้องควบคุมอุณหภูมิ'],
  }
];
