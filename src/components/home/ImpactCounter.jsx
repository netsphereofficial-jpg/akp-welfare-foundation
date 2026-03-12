'use client';

import { motion } from 'framer-motion';
import { FaUtensils, FaGraduationCap, FaHome, FaUsers } from 'react-icons/fa';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useContent } from '@/context/ContentContext';
import EditableStat from '@/components/editable/EditableStat';
import EditableSection from '@/components/editable/EditableSection';

const iconMap = {
  meal: FaUtensils,
  education: FaGraduationCap,
  family: FaHome,
  volunteer: FaUsers,
};

const colors = [
  'text-orange-500',
  'text-blue-600',
  'text-emerald-500',
  'text-violet-600',
];

const iconColors = [
  'text-orange-400',
  'text-blue-500',
  'text-emerald-400',
  'text-violet-500',
];

export default function ImpactCounter() {
  const { get, isEditMode } = useContent();
  const stats = get('impactStats') || [];

  return (
    <EditableSection label="Impact Stats">
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className={`${iconColors[index]} mx-auto mb-3`} size={24} />
                  {isEditMode ? (
                    <EditableStat
                      contentPath={`impactStats[${index}]`}
                      valueClassName={`text-3xl md:text-4xl font-bold font-heading ${colors[index]}`}
                      labelClassName="text-gray-500 text-sm mt-1"
                    />
                  ) : (
                    <>
                      <div className={`text-3xl md:text-4xl font-bold font-heading ${colors[index]}`}>
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
