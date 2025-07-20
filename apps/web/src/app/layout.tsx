import { Inter } from 'next/font/google';
import React from 'react';
// import './global.css';  // Temporarily commented out to test
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Merajut ASA - Platform Kolaborasi Digital Jawa Barat',
  description: 'Platform digital untuk membangun kolaborasi yang inklusif, berkelanjutan, dan berdampak di Jawa Barat',
  keywords: 'kolaborasi, jawa barat, digital, sosial, inovasi, komunitas',
  authors: [{ name: 'Tim Merajut ASA' }],
  openGraph: {
    title: 'Merajut ASA - Platform Kolaborasi Digital Jawa Barat',
    description: 'Platform digital untuk membangun kolaborasi yang inklusif, berkelanjutan, dan berdampak di Jawa Barat',
    type: 'website',
    locale: 'id_ID',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}