'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaCheckCircle, FaLock } from 'react-icons/fa';
import { DONATION_AMOUNTS } from '@/data/constants';

export default function DonationForm({ initialAmount }) {
  const [selectedAmount, setSelectedAmount] = useState(initialAmount || 500);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const amount = isCustom ? Number(customAmount) : selectedAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount < 1) return;
    setLoading(true);

    try {
      const res = await fetch('/api/donate/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, ...formData, isMonthly }),
      });

      const data = await res.json();

      // Mock mode — skip Razorpay checkout and show success directly
      if (data.mock) {
        setSuccess(true);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'AKP Welfare Foundation',
        description: isMonthly ? 'Monthly Donation' : 'One-time Donation',
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await fetch('/api/donate/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: data.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          if (verifyRes.ok) {
            setSuccess(true);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: '#2E7D32' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Donation error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-10 shadow-xl text-center max-w-lg mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-green-500" size={40} />
        </div>
        <h2 className="text-2xl font-bold font-heading text-gray-900 mb-3">Thank You!</h2>
        <p className="text-gray-600 mb-2">
          Your generous donation of <strong>&#8377;{amount.toLocaleString('en-IN')}</strong> has been received successfully.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          A confirmation email will be sent to <strong>{formData.email}</strong>.
          Your donation is eligible for 80G tax exemption.
        </p>
        <button
          onClick={() => { setSuccess(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
          className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full font-semibold transition-all"
        >
          Make Another Donation
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 md:p-10 shadow-xl max-w-lg mx-auto"
    >
      {/* Monthly toggle */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => setIsMonthly(false)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
            !isMonthly ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          One-time
        </button>
        <button
          type="button"
          onClick={() => setIsMonthly(true)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
            isMonthly ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Amount selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {DONATION_AMOUNTS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => { setIsCustom(false); setSelectedAmount(amt); setCustomAmount(''); }}
            className={`py-3 rounded-xl font-semibold transition-all text-sm ${
              selectedAmount === amt && !isCustom
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            &#8377;{amt.toLocaleString('en-IN')}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={() => { setIsCustom(true); setSelectedAmount(null); }}
          className={`w-full py-3 rounded-xl font-semibold transition-all text-sm ${
            isCustom ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              required
            />
          </div>
        )}
      </div>

      {/* Donor info */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Full Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900"
          required
        />
        <input
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900"
        />
        <textarea
          placeholder="Leave a message (optional)"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !amount || amount < 1}
        className="w-full bg-secondary-500 hover:bg-secondary-600 disabled:bg-gray-300 text-white py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <>
            <FaHeart />
            Donate &#8377;{amount ? Number(amount).toLocaleString('en-IN') : '...'}
            {isMonthly ? '/month' : ''}
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
        <FaLock size={10} />
        <span>Secure payment powered by Razorpay. Tax deductible under 80G.</span>
      </div>
    </motion.form>
  );
}
