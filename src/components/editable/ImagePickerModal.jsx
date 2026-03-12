'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaCheck } from 'react-icons/fa';

export default function ImagePickerModal({ currentUrl, onConfirm, onClose }) {
  const [url, setUrl] = useState(currentUrl || '');
  const [previewError, setPreviewError] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-gray-900">Change Image</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
            <FaTimes size={14} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Image URL</label>
            <input type="url" value={url} onChange={(e) => { setUrl(e.target.value); setPreviewError(false); }}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" autoFocus />
          </div>
          {url && !previewError && (
            <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
              <Image src={url} alt="Preview" fill className="object-cover" onError={() => setPreviewError(true)} unoptimized />
            </div>
          )}
          {previewError && (
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">Could not load image preview</div>
          )}
        </div>
        <div className="flex gap-2 p-4 border-t">
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
          <button onClick={() => url && onConfirm(url)} disabled={!url || previewError}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2">
            <FaCheck size={12} /> Apply
          </button>
        </div>
      </div>
    </div>
  );
}
