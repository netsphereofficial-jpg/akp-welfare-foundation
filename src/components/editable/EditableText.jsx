'use client';

import { useRef, useCallback, useState } from 'react';
import { useContent } from '@/context/ContentContext';

export default function EditableText({
  contentPath,
  as: Tag = 'span',
  className = '',
  multiline = false,
  ...props
}) {
  const { get, set, isEditMode } = useContent();
  const ref = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const value = get(contentPath) || '';

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (ref.current) {
      const newValue = ref.current.innerText;
      if (newValue !== value) {
        set(contentPath, newValue);
      }
    }
  }, [contentPath, set, value]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!multiline && e.key === 'Enter') {
        e.preventDefault();
        ref.current?.blur();
      }
    },
    [multiline]
  );

  if (!isEditMode) {
    return <Tag className={className} {...props}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      className={`${className} editable-text ${isFocused ? 'editable-focused' : ''}`}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {value}
    </Tag>
  );
}
