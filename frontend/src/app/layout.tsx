import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "健身助手",
  description: "您的个人健身教练和营养顾问",
  manifest: '/manifest.json'
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="relative min-h-screen bg-background font-sans antialiased">
          <Navbar />
          <main className="container py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
