'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHeart, FaHandsHelping } from 'react-icons/fa';
import { useContent } from '@/context/ContentContext';
import EditableText from '@/components/editable/EditableText';
import EditableImage from '@/components/editable/EditableImage';
import EditableSection from '@/components/editable/EditableSection';

export default function HeroSection() {
  const { get, isEditMode } = useContent();

  return (
    <EditableSection label="Hero Section">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        {isEditMode ? (
          <EditableImage
            contentPath="hero.backgroundImage"
            alt="Children smiling"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        ) : (
          <Image
            src={get('hero.backgroundImage')}
            alt="Children smiling"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {isEditMode ? (
              <EditableText
                contentPath="hero.badge"
                as="span"
                className="inline-block bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20"
              />
            ) : (
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
                {get('hero.badge')}
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isEditMode ? (
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading leading-tight mb-6">
                <EditableText contentPath="hero.titleLine1" as="span" className="text-white" />
                <br />
                <EditableText contentPath="hero.titleLine2" as="span" className="text-secondary-400" />
              </div>
            ) : (
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading leading-tight mb-6">
                {get('hero.titleLine1')}
                <br />
                <span className="text-secondary-400">{get('hero.titleLine2')}</span>
              </h1>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isEditMode ? (
              <EditableText
                contentPath="hero.description"
                as="p"
                className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed"
                multiline
              />
            ) : (
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
                {get('hero.description')}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/donate"
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-2xl hover:shadow-secondary-500/30 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <FaHeart />
              {isEditMode ? (
                <EditableText contentPath="hero.ctaPrimary" as="span" />
              ) : (
                get('hero.ctaPrimary')
              )}
            </Link>
            <Link
              href="/volunteer"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-white/30 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <FaHandsHelping />
              {isEditMode ? (
                <EditableText contentPath="hero.ctaSecondary" as="span" />
              ) : (
                get('hero.ctaSecondary')
              )}
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm"
          >
            {(get('hero.trustBadges') || []).map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                {isEditMode ? (
                  <EditableText contentPath={`hero.trustBadges[${i}]`} as="span" />
                ) : (
                  badge
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>
    </EditableSection>
  );
}
