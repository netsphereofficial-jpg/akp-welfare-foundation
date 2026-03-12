'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useContent } from '@/context/ContentContext';
import EditableImage from '@/components/editable/EditableImage';
import EditableText from '@/components/editable/EditableText';
import EditableSection from '@/components/editable/EditableSection';

export default function GallerySection() {
  const { get, isEditMode } = useContent();
  const gallery = get('gallery') || [];

  return (
    <EditableSection label="Gallery">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Work in Action"
            title="Photo Gallery"
            description="A glimpse into the impact we create every day across communities."
            contentPath="gallerySection"
          />

          {/* Row 1: 1 tall left + 4 stacked right */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Left tall */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl aspect-[4/3] md:aspect-auto md:h-full group cursor-pointer"
            >
              {gallery[0] && (
                isEditMode ? (
                  <EditableImage contentPath="gallery[0].src" alt={gallery[0].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <Image src={gallery[0].src} alt={gallery[0].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                )
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                {isEditMode && gallery[0] ? (
                  <EditableText contentPath="gallery[0].alt" as="span" className="text-white text-xs font-medium" />
                ) : (
                  <span className="text-white text-xs font-medium">{gallery[0]?.alt}</span>
                )}
              </div>
            </motion.div>

            {/* Right 4 grid */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i, idx) => (
                gallery[i] && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer"
                  >
                    {isEditMode ? (
                      <EditableImage contentPath={`gallery[${i}].src`} alt={gallery[i].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Image src={gallery[i].src} alt={gallery[i].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                      {isEditMode ? (
                        <EditableText contentPath={`gallery[${i}].alt`} as="span" className="text-white text-xs font-medium" />
                      ) : (
                        <span className="text-white text-xs font-medium">{gallery[i].alt}</span>
                      )}
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </div>

          {/* Row 2: single wide image */}
          {gallery[5] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl aspect-[21/9] group cursor-pointer"
            >
              {isEditMode ? (
                <EditableImage contentPath="gallery[5].src" alt={gallery[5].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <Image src={gallery[5].src} alt={gallery[5].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                {isEditMode ? (
                  <EditableText contentPath="gallery[5].alt" as="span" className="text-white text-xs font-medium" />
                ) : (
                  <span className="text-white text-xs font-medium">{gallery[5].alt}</span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </EditableSection>
  );
}
