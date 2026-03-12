import HeroSection from '@/components/home/HeroSection';
import ImpactCounter from '@/components/home/ImpactCounter';
import ProgramsSection from '@/components/home/ProgramsSection';
import StoriesSection from '@/components/home/StoriesSection';
import DonationSection from '@/components/home/DonationSection';
import VolunteerCTA from '@/components/home/VolunteerCTA';
import GallerySection from '@/components/home/GallerySection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactCounter />
      <ProgramsSection />
      <StoriesSection />
      <DonationSection />
      <VolunteerCTA />
      <GallerySection />
    </>
  );
}
