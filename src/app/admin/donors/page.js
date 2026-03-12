'use client';

import { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';

export default function AdminDonors() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    async function fetchDonors() {
      try {
        const res = await fetch('/api/admin/donors');
        const data = await res.json();
        setDonors(data || []);
      } catch (err) {
        console.error('Fetch donors error:', err);
      }
    }
    fetchDonors();
  }, []);

  const handleExport = () => {
    window.open('/api/admin/donors?format=csv', '_blank');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Donors</h1>
          <p className="text-gray-500 text-sm mt-1">{donors.length} unique donors</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          <FaDownload size={14} />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total Donated</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Donations</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Last Donation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No donors found.
                  </td>
                </tr>
              ) : (
                donors.map((d, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 text-sm">{d.name}</p>
                      <p className="text-gray-500 text-xs">{d.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">₹{d.totalDonated?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.donationCount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(d.lastDonation).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
