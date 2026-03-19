import { Property } from '../types';

// จำลองข้อมูลหอพักในเวียงจันทน์ให้สมจริงที่สุด
export const mockProperties: Property[] = [
  {
    id: 'prop-001',
    title: 'อพาร์ทเมนต์สไตล์โมเดิร์น ใกล้ประตูชัย',
    description: 'ห้องพักตกแต่งพร้อมอยู่ เฟอร์นิเจอร์ครบครัน เดินทางสะดวก ใกล้แหล่งของกินและคาเฟ่',
    pricePerMonth: 3500000,
    location: 'Chanthabouly, Vientiane',
    // ใช้รูปภาพจำลองฟรีจาก Unsplash
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop'],
    amenities: ['Air Con', 'WiFi', 'Parking', 'CCTV'],
    isAvailable: true,
  },
  {
    id: 'prop-002',
    title: 'คอนโดหรูวิวแม่น้ำโขง Vientiane Center',
    description: 'สัมผัสชีวิตเหนือระดับกับคอนโดพร้อมสระว่ายน้ำและฟิตเนส ระบบรักษาความปลอดภัย 24 ชม.',
    pricePerMonth: 6000000,
    location: 'Sikhottabong, Vientiane',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1e5250base?q=80&w=800&auto=format&fit=crop'],
    amenities: ['Air Con', 'WiFi', 'Pool', 'Gym', 'Security'],
    isAvailable: true,
  },
  {
    id: 'prop-003',
    title: 'ห้องเช่าราคาประหยัด โซนดงโดก (ใกล้มหาวิทยาลัย)',
    description: 'เหมาะสำหรับนักศึกษาและคนทำงาน ห้องกว้างขวาง อากาศถ่ายเทสะดวก มีเครื่องซักผ้าหยอดเหรียญ',
    pricePerMonth: 1500000,
    location: 'Xaythany, Vientiane',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop'],
    amenities: ['Fan', 'Parking'],
    isAvailable: true,
  }
];