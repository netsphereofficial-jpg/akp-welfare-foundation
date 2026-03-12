'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ src: '', alt: '', category: '' });

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      setImages(data || []);
    } catch (err) {
      console.error('Fetch gallery error:', err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ src: '', alt: '', category: '' });
      setShowForm(false);
      fetchImages();
    } catch (err) {
      console.error('Add image error:', err);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this image?')) return;
    try {
      await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchImages();
    } catch (err) {
      console.error('Delete image error:', err);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-heading text-gray-900">Gallery</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          <FaPlus size={12} />
          Add Photo
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold mb-4">Add New Photo</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Image URL"
              value={form.src}
              onChange={(e) => setForm({ ...form, src: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Alt text / Description"
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Category (e.g., Education, Food, Healthcare)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
            />
            <div className="flex gap-3">
              <button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
                Add Photo
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-semibold">
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-8 text-center text-gray-400 shadow-sm border border-gray-100">
            No photos in gallery. Click &quot;Add Photo&quot; to upload one.
          </div>
        ) : (
          images.map((image) => (
            <div key={image._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group relative">
              <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-primary-400/60 text-xs text-center px-2">{image.alt}</span>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-700 truncate">{image.alt}</p>
                {image.category && (
                  <span className="text-xs text-primary-500">{image.category}</span>
                )}
              </div>
              <button
                onClick={() => handleDelete(image._id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
