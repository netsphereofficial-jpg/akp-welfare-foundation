'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import ProgramCard from '@/components/ui/ProgramCard';
import { useContent } from '@/context/ContentContext';
import EditableSection from '@/components/editable/EditableSection';

export default function ProgramsSection() {
  const { get } = useContent();
  const programs = get('programs') || [];

  return (
    <EditableSection label="Programs">
      <section className="py-20 bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="What We Do"
            title="Our Programs"
            description="We run impactful programs that create lasting change in the lives of those who need it most."
            contentPath="programsSection"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <ProgramCard key={program.id} program={program} index={index} />
            ))}
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
