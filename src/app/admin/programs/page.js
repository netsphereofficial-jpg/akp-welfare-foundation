'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', shortDescription: '', fullDescription: '', image: '' });

  useEffect(() => {
    fetchPrograms();
  }, []);

  async function fetchPrograms() {
    try {
      const res = await fetch('/api/admin/programs');
      const data = await res.json();
      setPrograms(data || []);
    } catch (err) {
      console.error('Fetch programs error:', err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editing) {
        await fetch('/api/admin/programs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing, ...form }),
        });
      } else {
        await fetch('/api/admin/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      setForm({ title: '', shortDescription: '', fullDescription: '', image: '' });
      setEditing(null);
      setShowForm(false);
      fetchPrograms();
    } catch (err) {
      console.error('Save program error:', err);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      await fetch('/api/admin/programs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchPrograms();
    } catch (err) {
      console.error('Delete program error:', err);
    }
  }

  function startEdit(program) {
    setForm({
      title: program.title,
      shortDescription: program.shortDescription,
      fullDescription: program.fullDescription,
      image: program.image || '',
    });
    setEditing(program._id);
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-heading text-gray-900">Programs</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ title: '', shortDescription: '', fullDescription: '', image: '' }); }}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          <FaPlus size={12} />
          Add Program
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold mb-4">{editing ? 'Edit Program' : 'New Program'}</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Program Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Short Description"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
              required
            />
            <textarea
              placeholder="Full Description"
              value={form.fullDescription}
              onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none"
              required
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
            />
            <div className="flex gap-3">
              <button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
                {editing ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Programs List */}
      <div className="grid gap-4">
        {programs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400 shadow-sm border border-gray-100">
            No programs added yet. Click &quot;Add Program&quot; to create one.
          </div>
        ) : (
          programs.map((program) => (
            <div key={program._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{program.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${program.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {program.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{program.shortDescription}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(program)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(program._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
