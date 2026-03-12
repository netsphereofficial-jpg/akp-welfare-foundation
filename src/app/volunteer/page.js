'use client';

import { motion } from 'framer-motion';
import { FaUsers, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa';
import VolunteerForm from '@/components/volunteer/VolunteerForm';

export default function VolunteerPage() {
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
            Become a Volunteer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-100 max-w-2xl mx-auto"
          >
            Join our community of changemakers and make a real difference in people&apos;s lives.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: FaUsers, title: '5,000+ Volunteers', desc: 'Join a thriving community' },
              { icon: FaMapMarkerAlt, title: '15+ Cities', desc: 'Work across India' },
              { icon: FaClock, title: 'Flexible Hours', desc: 'Choose your own schedule' },
              { icon: FaHeart, title: 'Real Impact', desc: 'See your work change lives' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-section rounded-2xl"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="text-primary-500" size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 bg-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-3">Sign Up to Volunteer</h2>
            <p className="text-gray-600">Fill out the form below and our team will get in touch.</p>
          </div>
          <VolunteerForm />
        </div>
      </section>
    </>
  );
}
