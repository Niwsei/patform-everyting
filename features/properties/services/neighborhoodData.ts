export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  description: string;
  highlights: string[];
  vibe: string;
  stats: {
    averageRent: number;
    safetyScore: number;
    walkability: number;
  };
  images: string[];
}

export const neighborhoods: Neighborhood[] = [
  {
    id: 'nb-001',
    slug: 'chanthabouly',
    name: 'จันทะบูลี (ใจกลางเมือง)',
    description: 'ย่านที่เป็นหัวใจสำคัญของเวียงจันทน์ เป็นที่ตั้งของสถานที่สำคัญอย่างประตูชัยและสำนักงานรัฐบาล รายล้อมด้วยคาเฟ่ทันสมัยและร้านอาหารชั้นเลิศ',
    highlights: ['ประตูชัย (Patuxay)', 'ตลาดเช้า Shopping Center', 'ริมแม่น้ำโขง (Night Market)'],
    vibe: 'คึกคักและทันสมัย เหมาะสำหรับคนวัยทำงานและนักท่องเที่ยว',
    stats: {
      averageRent: 4500000,
      safetyScore: 95,
      walkability: 90
    },
    images: ['https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1200&auto=format&fit=crop']
  },
  {
    id: 'nb-002',
    slug: 'sisattanak',
    name: 'สีสัตตนาค (ย่านสถานทูต)',
    description: 'ย่านที่พักอาศัยระดับพรีเมียม เป็นที่ตั้งของสถานทูตหลายแห่งและโรงเรียนนานาชาติ มีความสงบ ร่มรื่น และปลอดภัยสูง',
    highlights: ['สถานทูตไทย/เยอรมัน', 'โรงเรียนนานาชาติ VIS', 'โฮงหมอเสดถา'],
    vibe: 'หรูหรา สงบเงียบ และเป็นส่วนตัว',
    stats: {
      averageRent: 6500000,
      safetyScore: 98,
      walkability: 70
    },
    images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop']
  },
  {
    id: 'nb-003',
    slug: 'xaysetha',
    name: 'ไซเศรษฐา (ย่านธุรกิจใหม่)',
    description: 'พื้นที่ที่กำลังเติบโตอย่างรวดเร็ว พร้อมโครงการอสังหาริมทรัพย์สมัยใหม่และห้างสรรพสินค้าขนาดใหญ่ เดินทางสะดวกไปยังเขตอุตสาหกรรม',
    highlights: ['บึงธาตุหลวง', 'ห้าง ITECC', 'ศูนย์ธุรกิจลาว-ไต้หวัน'],
    vibe: 'กำลังพัฒนา มีพลัง และพื้นที่กว้างขวาง',
    stats: {
      averageRent: 3500000,
      safetyScore: 90,
      walkability: 60
    },
    images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop']
  }
];
