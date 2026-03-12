'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Script from 'next/script';
import DonationForm from '@/components/donate/DonationForm';
import { FaShieldAlt, FaReceipt, FaHandHoldingHeart } from 'react-icons/fa';

function DonateContent() {
  const searchParams = useSearchParams();
  const initialAmount = searchParams.get('amount');

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
          >
            Make a Donation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-100 max-w-2xl mx-auto"
          >
            Your generosity directly transforms lives. Every rupee counts towards building a better future.
          </motion.p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DonationForm initialAmount={initialAmount ? Number(initialAmount) : null} />

          {/* Trust signals */}
          <div className="grid sm:grid-cols-3 gap-6 mt-16">
            {[
              { icon: FaShieldAlt, title: '100% Secure', desc: 'Bank-grade security for all transactions' },
              { icon: FaReceipt, title: '80G Tax Benefit', desc: 'Get tax exemption certificate via email' },
              { icon: FaHandHoldingHeart, title: 'Direct Impact', desc: '95% of donations reach beneficiaries' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
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
    </>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <DonateContent />
    </Suspense>
  );
}
