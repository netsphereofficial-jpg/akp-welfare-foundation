'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGraduationCap, FaUtensils, FaHeartbeat, FaHandsHelping, FaArrowRight } from 'react-icons/fa';
import SectionHeading from '@/components/ui/SectionHeading';
import { PROGRAMS } from '@/data/constants';
import { IMAGES } from '@/data/images';

const iconMap = {
  FaGraduationCap,
  FaUtensils,
  FaHeartbeat,
  FaHandsHelping,
};

const programImageKeys = ['education', 'food', 'healthcare', 'community'];

export default function ProgramsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
          >
            Our Programs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-100 max-w-2xl mx-auto"
          >
            Comprehensive welfare programs designed to create lasting impact in underserved communities.
          </motion.p>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {PROGRAMS.map((program, index) => {
            const Icon = iconMap[program.icon];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={program.id}
                id={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center mb-24 last:mb-0"
              >
                {/* Image */}
                <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="rounded-3xl h-72 lg:h-96 relative overflow-hidden">
                    <Image
                      src={IMAGES.programs[programImageKeys[index]] || IMAGES.programs.education}
                      alt={program.title}
                      fill
                      className="object-cover rounded-3xl"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${program.color}15` }}
                  >
                    <Icon size={24} style={{ color: program.color }} />
                  </div>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">{program.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{program.fullDescription}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {Object.entries(program.stats).map(([key, value]) => (
                      <div key={key} className="bg-section rounded-xl p-4 text-center">
                        <p className="text-xl font-bold font-heading" style={{ color: program.color }}>
                          {value}
                        </p>
                        <p className="text-xs text-gray-500 capitalize mt-1">{key}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg text-sm"
                    style={{ backgroundColor: program.color }}
                  >
                    Support This Program <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            subtitle="Get Involved"
            title="Want to Support Our Programs?"
            description="Your contribution can help us expand our reach and impact more lives."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/donate"
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg"
            >
              Donate Now
            </Link>
            <Link
              href="/volunteer"
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
