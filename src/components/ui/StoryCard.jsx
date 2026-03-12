'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useContent } from '@/context/ContentContext';
import EditableImage from '@/components/editable/EditableImage';
import EditableText from '@/components/editable/EditableText';

export default function StoryCard({ story, index }) {
  const { isEditMode } = useContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="h-52 relative overflow-hidden">
          {isEditMode ? (
            <EditableImage
              contentPath={`stories[${index}].image`}
              alt={story.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {isEditMode ? (
            <EditableText
              contentPath={`stories[${index}].category`}
              as="span"
              className="absolute top-4 left-4 bg-white/90 text-primary-500 text-xs font-semibold px-3 py-1 rounded-full z-10"
            />
          ) : (
            <span className="absolute top-4 left-4 bg-white/90 text-primary-500 text-xs font-semibold px-3 py-1 rounded-full">
              {story.category}
            </span>
          )}
        </div>
        <div className="p-6">
          {isEditMode ? (
            <EditableText
              contentPath={`stories[${index}].title`}
              as="h3"
              className="text-lg font-bold font-heading mb-2 text-gray-900 group-hover:text-primary-500 transition-colors"
            />
          ) : (
            <h3 className="text-lg font-bold font-heading mb-2 text-gray-900 group-hover:text-primary-500 transition-colors">
              {story.title}
            </h3>
          )}
          {isEditMode ? (
            <EditableText
              contentPath={`stories[${index}].excerpt`}
              as="p"
              className="text-gray-600 text-sm leading-relaxed mb-4"
              multiline
            />
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {story.excerpt}
            </p>
          )}
          <span className="inline-flex items-center gap-2 text-secondary-500 text-sm font-semibold group-hover:gap-3 transition-all">
            Read Story <FaArrowRight className="text-xs" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
