'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaUsers, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useContent } from '@/context/ContentContext';
import EditableText from '@/components/editable/EditableText';
import EditableImage from '@/components/editable/EditableImage';
import EditableSection from '@/components/editable/EditableSection';

export default function VolunteerCTA() {
  const { get, isEditMode } = useContent();
  const benefits = get('volunteerCTA.benefits') || [];

  const iconMap = {
    FaMapMarkerAlt,
    FaClock,
    FaUsers,
  };

  return (
    <EditableSection label="Volunteer CTA">
      <section className="py-20 bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl h-80 lg:h-96 relative overflow-hidden">
                {isEditMode ? (
                  <EditableImage
                    contentPath="volunteerCTA.image"
                    alt="Volunteers working together"
                    fill
                    className="object-cover rounded-3xl"
                  />
                ) : (
                  <Image
                    src={get('volunteerCTA.image')}
                    alt="Volunteers working together"
                    fill
                    className="object-cover rounded-3xl"
                  />
                )}
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-2 md:right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary-50 rounded-xl flex items-center justify-center">
                  <FaUsers className="text-secondary-500" size={20} />
                </div>
                <div>
                  {isEditMode ? (
                    <>
                      <EditableText contentPath="volunteerCTA.floatingStatValue" as="p" className="text-2xl font-bold font-heading text-gray-900" />
                      <EditableText contentPath="volunteerCTA.floatingStatLabel" as="p" className="text-xs text-gray-500" />
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold font-heading text-gray-900">{get('volunteerCTA.floatingStatValue')}</p>
                      <p className="text-xs text-gray-500">{get('volunteerCTA.floatingStatLabel')}</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {isEditMode ? (
                <EditableText contentPath="volunteerCTA.subtitle" as="span" className="text-sm font-semibold uppercase tracking-widest text-primary-500" />
              ) : (
                <span className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                  {get('volunteerCTA.subtitle')}
                </span>
              )}
              {isEditMode ? (
                <EditableText contentPath="volunteerCTA.title" as="h2" className="text-3xl md:text-4xl font-bold font-heading mt-2 mb-6 text-gray-900" />
              ) : (
                <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2 mb-6 text-gray-900">
                  {get('volunteerCTA.title')}
                </h2>
              )}
              {isEditMode ? (
                <EditableText contentPath="volunteerCTA.description" as="p" className="text-gray-600 mb-8 leading-relaxed" multiline />
              ) : (
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {get('volunteerCTA.description')}
                </p>
              )}

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, i) => {
                  const Icon = iconMap[benefit.icon] || FaUsers;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="text-primary-500" size={16} />
                      </div>
                      {isEditMode ? (
                        <EditableText contentPath={`volunteerCTA.benefits[${i}].text`} as="span" className="text-gray-700 text-sm" />
                      ) : (
                        <span className="text-gray-700 text-sm">{benefit.text}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary-500/30"
              >
                {isEditMode ? (
                  <EditableText contentPath="volunteerCTA.ctaText" as="span" />
                ) : (
                  get('volunteerCTA.ctaText')
                )}
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
