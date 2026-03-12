'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { ContentProvider } from '@/context/ContentContext';
import contentJson from '../../../content/content.json';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ContentProvider initialContent={contentJson} editMode={false}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ContentProvider>
  );
}
