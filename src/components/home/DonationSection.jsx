'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import SectionHeading from '@/components/ui/SectionHeading';
import { useContent } from '@/context/ContentContext';
import EditableSection from '@/components/editable/EditableSection';
import EditableText from '@/components/editable/EditableText';

export default function DonationSection() {
  const { get, isEditMode } = useContent();
  const donationAmounts = get('donationSection.amounts') || [100, 500, 1000, 5000];

  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const handleCustom = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const handlePreset = (amount) => {
    setIsCustom(false);
    setCustomAmount('');
    setSelectedAmount(amount);
  };

  const finalAmount = isCustom ? customAmount : selectedAmount;

  return (
    <EditableSection label="Donation">
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            subtitle="Make a Difference"
            title="Your Donation Matters"
            description="Every rupee you donate directly impacts lives. Choose an amount and help us create lasting change."
            light
            contentPath="donationSection"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl max-w-xl mx-auto"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {donationAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handlePreset(amount)}
                  className={`py-3 rounded-xl font-semibold transition-all text-sm ${
                    selectedAmount === amount && !isCustom
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  &#8377;{amount.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <button
                onClick={handleCustom}
                className={`w-full py-3 rounded-xl font-semibold transition-all text-sm ${
                  isCustom
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Custom Amount
              </button>
              {isCustom && (
                <div className="mt-3 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">&#8377;</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900"
                    min="1"
                  />
                </div>
              )}
            </div>

            <Link
              href={`/donate?amount=${finalAmount || ''}`}
              className="w-full bg-secondary-500 hover:bg-secondary-600 text-white py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              <FaHeart />
              Donate &#8377;{finalAmount ? Number(finalAmount).toLocaleString('en-IN') : '...'}
            </Link>

            {isEditMode ? (
              <EditableText
                contentPath="donationSection.footerNote"
                as="p"
                className="text-center text-xs text-gray-500 mt-4"
              />
            ) : (
              <p className="text-center text-xs text-gray-500 mt-4">
                {get('donationSection.footerNote') || 'Secure payment powered by Razorpay. Tax deductible under 80G.'}
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </EditableSection>
  );
}
