import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'AKP Welfare Foundation - Together We Can Change Lives',
    template: '%s | AKP Welfare Foundation',
  },
  description: 'AKP Welfare Foundation empowers underprivileged communities through education, nutrition, healthcare, and sustainable development programs across India.',
  keywords: ['NGO', 'charity', 'welfare', 'education', 'food distribution', 'healthcare', 'India', 'donate', 'volunteer'],
  authors: [{ name: 'AKP Welfare Foundation' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'AKP Welfare Foundation',
    title: 'AKP Welfare Foundation - Together We Can Change Lives',
    description: 'Empowering underprivileged communities through education, nutrition, healthcare, and sustainable development.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AKP Welfare Foundation',
    description: 'Together We Can Change Lives',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
