'use client';

import { ContentProvider } from '@/context/ContentContext';
import AdminToolbar from '@/components/admin/AdminToolbar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ImpactCounter from '@/components/home/ImpactCounter';
import ProgramsSection from '@/components/home/ProgramsSection';
import StoriesSection from '@/components/home/StoriesSection';
import DonationSection from '@/components/home/DonationSection';
import VolunteerCTA from '@/components/home/VolunteerCTA';
import GallerySection from '@/components/home/GallerySection';
import contentJson from '../../../../content/content.json';

export default function EditorPage() {
  return (
    <ContentProvider initialContent={contentJson} editMode={true}>
      <AdminToolbar />
      <div className="editor-mode">
        <Navbar />
        <main>
          <HeroSection />
          <ImpactCounter />
          <ProgramsSection />
          <StoriesSection />
          <DonationSection />
          <VolunteerCTA />
          <GallerySection />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}
