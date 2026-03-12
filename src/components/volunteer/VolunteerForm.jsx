'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const SKILLS = [
  'Teaching', 'Medical', 'Counseling', 'Photography',
  'Social Media', 'Fundraising', 'Event Management', 'Cooking',
  'Driving', 'IT/Tech', 'Design', 'Other',
];

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', city: '', availability: '', message: '',
  });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, skills: selectedSkills }),
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error('Volunteer form error:', err);
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
        <h2 className="text-2xl font-bold font-heading text-gray-900 mb-3">Welcome Aboard!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for signing up as a volunteer, <strong>{formData.name}</strong>!
          Our team will review your application and reach out within 48 hours.
        </p>
        <button
          onClick={() => { setSuccess(false); setFormData({ name: '', email: '', phone: '', city: '', availability: '', message: '' }); setSelectedSkills([]); }}
          className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full font-semibold transition-all"
        >
          Done
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
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Full Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900"
          required
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900"
            required
          />
          <input
            type="tel"
            placeholder="Phone *"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900"
            required
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City *"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900"
            required
          />
          <select
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 bg-white"
            required
          >
            <option value="">Availability *</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="both">Both</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Skills (select all that apply)</label>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedSkills.includes(skill)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <textarea
        placeholder="Tell us why you'd like to volunteer (optional)"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={3}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 resize-none mb-6"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          'Submit Application'
        )}
      </button>
    </motion.form>
  );
}
