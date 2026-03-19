import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: 'public',// ให้ระบบสร้างไฟล์ Service Worker ไว้ใน public
   cacheOnFrontEndNav: true,// แคชข้อมูลเวลาผู้ใช้กดเปลี่ยนหน้า ทำให้แอปลื่นปรี๊ด
   aggressiveFrontEndNavCaching: true,
   reloadOnOnline: true, // โหลดข้อมูลใหม่ตอนเน็ตกลับมาใช้งานได้
   disable: process.env.NODE_ENV === 'development' // ปิด PWA ตอนกำลังเขียนโค้ด จะได้ไม่งงเรื่อง Cache
})


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }

    ]
  }
};

export default withPWA(nextConfig)
