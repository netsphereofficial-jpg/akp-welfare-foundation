'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGraduationCap, FaUtensils, FaHeartbeat, FaHandsHelping, FaArrowRight } from 'react-icons/fa';
import { useContent } from '@/context/ContentContext';
import EditableText from '@/components/editable/EditableText';

const iconMap = {
  FaGraduationCap,
  FaUtensils,
  FaHeartbeat,
  FaHandsHelping,
};

export default function ProgramCard({ program, index }) {
  const { isEditMode } = useContent();
  const Icon = iconMap[program.icon] || FaHandsHelping;

  const cardContent = (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 h-full">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${program.color}15` }}
      >
        <Icon size={28} style={{ color: program.color }} />
      </div>
      {isEditMode ? (
        <EditableText
          contentPath={`programs[${index}].title`}
          as="h3"
          className="text-xl font-bold font-heading mb-3 text-gray-900 group-hover:text-primary-500 transition-colors"
        />
      ) : (
        <h3 className="text-xl font-bold font-heading mb-3 text-gray-900 group-hover:text-primary-500 transition-colors">
          {program.title}
        </h3>
      )}
      {isEditMode ? (
        <EditableText
          contentPath={`programs[${index}].shortDescription`}
          as="p"
          className="text-gray-600 text-sm leading-relaxed mb-4"
          multiline
        />
      ) : (
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {program.shortDescription}
        </p>
      )}
      <span className="inline-flex items-center gap-2 text-primary-500 text-sm font-semibold group-hover:gap-3 transition-all">
        Learn More <FaArrowRight className="text-xs" />
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {isEditMode ? (
        <div>{cardContent}</div>
      ) : (
        <Link href={`/programs#${program.id}`}>
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}
