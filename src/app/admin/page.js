'use client';

import { useState, useEffect } from 'react';
import { FaDonate, FaUsers, FaHandsHelping, FaChartLine } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    totalDonors: 0,
    totalVolunteers: 0,
  });
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [donationsRes, volunteersRes] = await Promise.all([
          fetch('/api/admin/donations?limit=5'),
          fetch('/api/volunteer'),
        ]);

        const donationsData = await donationsRes.json();
        const volunteersData = await volunteersRes.json();

        setStats({
          totalDonations: donationsData.total || 0,
          totalAmount: donationsData.totalAmount || 0,
          totalDonors: new Set(donationsData.donations?.map(d => d.email)).size || 0,
          totalVolunteers: volunteersData.length || 0,
        });
        setRecentDonations(donationsData.donations || []);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Donations', value: stats.totalDonations, icon: FaDonate, color: 'bg-blue-500' },
    { label: 'Total Amount', value: `₹${stats.totalAmount.toLocaleString('en-IN')}`, icon: FaChartLine, color: 'bg-green-500' },
    { label: 'Unique Donors', value: stats.totalDonors, icon: FaUsers, color: 'bg-purple-500' },
    { label: 'Volunteers', value: stats.totalVolunteers, icon: FaHandsHelping, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-heading text-gray-900 mb-8">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className="text-white" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold font-heading text-gray-900">{card.value}</p>
            <p className="text-gray-500 text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold font-heading text-gray-900">Recent Donations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentDonations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    No donations yet. They will appear here once received.
                  </td>
                </tr>
              ) : (
                recentDonations.map((d) => (
                  <tr key={d._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 text-sm">{d.name}</p>
                      <p className="text-gray-500 text-xs">{d.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{d.amount?.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        d.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : d.status === 'created'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(d.createdAt).toLocaleDateString('en-IN')}
                    </td>
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
