import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spiritual Gifts Assessment | 3Nails.ai',
  description:
    'Discover your spiritual gifts with a personalized AI-powered assessment. Takes about 5 minutes.',
  openGraph: {
    title: 'Spiritual Gifts Assessment | 3Nails.ai',
    description: 'Discover your spiritual gifts with a personalized AI-powered assessment.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
