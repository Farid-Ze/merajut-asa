import { Inter } from 'next/font/google';
import './globals.css';

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
