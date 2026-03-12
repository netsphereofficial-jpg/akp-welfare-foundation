'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaQuoteLeft } from 'react-icons/fa';
import SectionHeading from '@/components/ui/SectionHeading';
import { TEAM_MEMBERS, MILESTONES } from '@/data/constants';
import { IMAGES } from '@/data/images';

const teamImageKeys = ['founder', 'director', 'operations', 'volunteer_coord'];

export default function AboutPage() {
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
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-100 max-w-2xl mx-auto"
          >
            Learn about our journey, mission, and the people behind AKP Welfare Foundation.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                <FaBullseye className="text-primary-500" size={24} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower underprivileged communities by providing access to quality education,
                nutritious food, healthcare services, and sustainable livelihood opportunities.
                We believe that every individual deserves the chance to live a dignified life,
                and we work tirelessly to make that a reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
            >
              <div className="w-14 h-14 bg-secondary-50 rounded-2xl flex items-center justify-center mb-6">
                <FaEye className="text-secondary-500" size={24} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where every community thrives with equal access to education, healthcare,
                and opportunities for growth. We envision self-sustaining communities where no
                child goes hungry, no family is without shelter, and every individual has the
                tools to build a better future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-20 bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-3xl h-80 lg:h-96 relative overflow-hidden">
                <Image
                  src={IMAGES.about.founder}
                  alt="Arun Kumar Patel - Founder"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FaQuoteLeft className="text-primary-200 mb-4" size={40} />
              <blockquote className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                &ldquo;I founded AKP Welfare Foundation with a simple belief — that compassion,
                when channeled through action, can transform entire communities. Every meal served,
                every child educated, and every family supported brings us closer to the India we
                dream of. Join us in this journey of hope and change.&rdquo;
              </blockquote>
              <div>
                <p className="text-lg font-bold font-heading text-gray-900">Arun Kumar Patel</p>
                <p className="text-primary-500 text-sm">Founder & President</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Journey"
            title="Milestones"
            description="From a small initiative to a nationwide movement — here's how we've grown."
          />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-100 -translate-x-1/2" />

            {MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-6 mb-10 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full -translate-x-1/2 mt-1 border-4 border-white shadow z-10" />

                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <span className="text-sm font-bold text-primary-500">{milestone.year}</span>
                  <h3 className="text-lg font-bold font-heading text-gray-900 mt-1">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our People"
            title="Meet the Team"
            description="Dedicated professionals working together to create meaningful change."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 relative overflow-hidden">
                  <Image
                    src={IMAGES.team[teamImageKeys[index]] || IMAGES.team.founder}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold font-heading text-gray-900">{member.name}</h3>
                <p className="text-primary-500 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AKP */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            subtitle="Why Choose Us"
            title="Why AKP Welfare Foundation?"
            light
          />
          <div className="grid sm:grid-cols-3 gap-8 mt-8">
            {[
              { number: '100%', label: 'Transparency in fund usage' },
              { number: '80G', label: 'Tax exemption for all donations' },
              { number: '6+', label: 'Years of trusted service' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl font-bold font-heading mb-2">{item.number}</p>
                <p className="text-primary-100 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
