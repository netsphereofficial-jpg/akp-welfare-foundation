'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import ImagePickerModal from './ImagePickerModal';
import { FaCamera } from 'react-icons/fa';

export default function EditableImage({
  contentPath,
  alt = '',
  fill,
  width,
  height,
  className = '',
  ...props
}) {
  const { get, set, isEditMode } = useContent();
  const [showPicker, setShowPicker] = useState(false);
  const src = get(contentPath) || '';

  if (!isEditMode) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={className}
        {...props}
      />
    );
  }

  return (
    <>
      <div className="relative group" style={fill ? { position: 'static' } : {}}>
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={className}
          {...props}
        />
        <div
          onClick={() => setShowPicker(true)}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
        >
          <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
            <FaCamera className="text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Change Image</span>
          </div>
        </div>
      </div>

      {showPicker && (
        <ImagePickerModal
          currentUrl={src}
          onConfirm={(url) => {
            set(contentPath, url);
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}
