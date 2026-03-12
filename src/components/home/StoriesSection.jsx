'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import StoryCard from '@/components/ui/StoryCard';
import { useContent } from '@/context/ContentContext';
import EditableSection from '@/components/editable/EditableSection';

export default function StoriesSection() {
  const { get } = useContent();
  const stories = get('stories') || [];

  return (
    <EditableSection label="Impact Stories">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Real Impact"
            title="Stories of Change"
            description="Every donation, every volunteer hour creates ripples of change. Here are some stories that inspire us."
            contentPath="storiesSection"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
