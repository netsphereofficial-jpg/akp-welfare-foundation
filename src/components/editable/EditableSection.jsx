'use client';

import { useContent } from '@/context/ContentContext';

export default function EditableSection({ sectionId, label, children, className = '' }) {
  const { isEditMode } = useContent();

  if (!isEditMode) {
    return <>{children}</>;
  }

  return (
    <div className={`relative editable-section group/section ${className}`} data-section={sectionId}>
      <div className="absolute top-2 left-2 z-30 opacity-0 group-hover/section:opacity-100 transition-opacity">
        <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
