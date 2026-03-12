'use client';

import { motion } from 'framer-motion';
import EditableText from '@/components/editable/EditableText';
import { useContent } from '@/context/ContentContext';

export default function SectionHeading({ subtitle, title, description, center = true, light = false, contentPath }) {
  let isEditMode = false;
  try {
    const ctx = useContent();
    isEditMode = ctx.isEditMode;
  } catch {
    // Not wrapped in ContentProvider
  }

  const useEditable = contentPath && isEditMode;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {(subtitle || contentPath) && (
        useEditable ? (
          <EditableText
            contentPath={`${contentPath}.subtitle`}
            as="span"
            className={`text-sm font-semibold uppercase tracking-widest ${
              light ? 'text-primary-300' : 'text-primary-500'
            }`}
          />
        ) : (
          <span className={`text-sm font-semibold uppercase tracking-widest ${
            light ? 'text-primary-300' : 'text-primary-500'
          }`}>
            {subtitle}
          </span>
        )
      )}
      {useEditable ? (
        <EditableText
          contentPath={`${contentPath}.title`}
          as="h2"
          className={`text-3xl md:text-4xl font-bold font-heading mt-2 mb-4 ${
            light ? 'text-white' : 'text-gray-900'
          }`}
        />
      ) : (
        <h2 className={`text-3xl md:text-4xl font-bold font-heading mt-2 mb-4 ${
          light ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h2>
      )}
      {(description || contentPath) && (
        useEditable ? (
          <EditableText
            contentPath={`${contentPath}.description`}
            as="p"
            className={`max-w-2xl text-lg ${center ? 'mx-auto' : ''} ${
              light ? 'text-gray-300' : 'text-gray-600'
            }`}
          />
        ) : (
          <p className={`max-w-2xl text-lg ${center ? 'mx-auto' : ''} ${
            light ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {description}
          </p>
        )
      )}
    </motion.div>
  );
}
