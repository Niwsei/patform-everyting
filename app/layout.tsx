import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNavbar } from "@/components/layouts/MainNavbar";
import { BottomNav } from "@/components/layouts/BottomNav";
import { Providers } from "@/components/Providers";
import { ChatWidget } from "@/features/chat/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vientiane Nest | หาหอพักในเวียงจันทน์",
  description: 'แพลตฟอร์มหาหอพักและอสังหาฯ ที่ดีที่สุด',
  manifest: '/manifest.json', // เชื่อม PWA ตรงนี้
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <MainNavbar />
          <div className="pb-20 lg:pb-0">
            {children}
          </div>
          <BottomNav />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
