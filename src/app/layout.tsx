import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Varys | Geo-Security & Agri-Intelligence Drone Platform',
  description: 'Varys connects drone missions, aerial analysis, agricultural intelligence, security monitoring and project reporting in one clear platform.',
  keywords: [
    'Drone intelligence',
    'Drone mission planning',
    'Agricultural intelligence',
    'NDVI vegetation analysis',
    'Security surveillance',
    'Aerial data management',
    'Drone operational management',
  ],
  authors: [{ name: 'Varys Team' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  openGraph: {
    title: 'Varys - Turn drone data into decisions that move',
    description: 'Connect drone missions, aerial analysis, agricultural intelligence, security monitoring and project reporting in one clear platform.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://varys.vercel.app',
    siteName: 'Varys',
    images: [
      {
        url: '/assets/hero-dashboard.png',
        width: 1200,
        height: 630,
        alt: 'Varys Drone Operational Intelligence Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varys | Geo-Security & Agri-Intelligence Drone Platform',
    description: 'Turn aerial information into clear, actionable decisions.',
    images: ['/assets/hero-dashboard.png'],
  },
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-varyz-navy text-varyz-offwhite min-h-screen antialiased selection:bg-varyz-lime selection:text-varyz-navy">
        {children}
      </body>
    </html>
  );
}
