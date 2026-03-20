export interface ServiceProvider {
  id: string;
  name: string;
  category: 'moving' | 'cleaning' | 'repair';
  rating: number;
  reviewCount: number;
  priceRange: string;
  description: string;
  image: string;
  isVerified: boolean;
}

export const serviceProviders: ServiceProvider[] = [
  {
    id: 'sp-001',
    name: 'Vientiane Express Moving',
    category: 'moving',
    rating: 4.9,
    reviewCount: 156,
    priceRange: '₭200k - ₭1.5M',
    description: 'บริการขนย้ายมืออาชีพ พร้อมทีมงานยกของและรถบรรทุกหลายขนาด ครอบคลุมทั่วเวียงจันทน์',
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=600&auto=format&fit=crop',
    isVerified: true
  },
  {
    id: 'sp-002',
    name: 'Clean Nest Laos',
    category: 'cleaning',
    rating: 4.8,
    reviewCount: 89,
    priceRange: '₭150k - ₭500k',
    description: 'บริการทำความสะอาดบ้านและคอนโดแบบ Deep Cleaning โดยทีมงานที่ผ่านการตรวจสอบประวัติ',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=600&auto=format&fit=crop',
    isVerified: true
  },
  {
    id: 'sp-003',
    name: 'Mr. Fix-It Vientiane',
    category: 'repair',
    rating: 4.7,
    reviewCount: 42,
    priceRange: '₭100k - ₭800k',
    description: 'ซ่อมไฟฟ้า ประปา และแอร์ โดยช่างผู้เชี่ยวชาญ รับประกันงานซ่อม 30 วัน',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop',
    isVerified: false
  }
];
