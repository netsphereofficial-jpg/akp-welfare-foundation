'use client';

import { useState, useEffect } from 'react';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetchDonations() {
      try {
        const params = new URLSearchParams({ page, limit: 20 });
        if (filter) params.set('status', filter);
        const res = await fetch(`/api/admin/donations?${params}`);
        const data = await res.json();
        setDonations(data.donations || []);
        setTotalPages(data.totalPages || 1);
        setTotalAmount(data.totalAmount || 0);
      } catch (err) {
        console.error('Fetch donations error:', err);
      }
    }
    fetchDonations();
  }, [page, filter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Donations</h1>
          <p className="text-gray-500 text-sm mt-1">
            Total collected: <span className="font-semibold text-green-600">₹{totalAmount.toLocaleString('en-IN')}</span>
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm bg-white"
        >
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="created">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    No donations found.
                  </td>
                </tr>
              ) : (
                donations.map((d) => (
                  <tr key={d._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 text-sm">{d.name}</p>
                      <p className="text-gray-500 text-xs">{d.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{d.amount?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.isMonthly ? 'Monthly' : 'One-time'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        d.status === 'paid' ? 'bg-green-100 text-green-700'
                        : d.status === 'created' ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                      }`}>{d.status}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 font-mono">{d.orderId?.slice(-12)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(d.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
