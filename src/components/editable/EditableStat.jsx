'use client';

import { useState } from 'react';
import { useContent } from '@/context/ContentContext';

export default function EditableStat({
  contentPath,
  valueClassName = '',
  labelClassName = '',
  renderValue,
}) {
  const { get, set, isEditMode } = useContent();
  const stat = get(contentPath) || {};
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(String(stat.value || ''));
  const [tempLabel, setTempLabel] = useState(stat.label || '');
  const [tempSuffix, setTempSuffix] = useState(stat.suffix || '');

  if (!isEditMode) {
    return (
      <>
        <div className={valueClassName}>
          {renderValue ? renderValue(stat) : `${stat.value?.toLocaleString()}${stat.suffix || ''}`}
        </div>
        <p className={labelClassName}>{stat.label}</p>
      </>
    );
  }

  if (!isEditing) {
    return (
      <div
        className="editable-text cursor-pointer"
        onClick={() => {
          setTempValue(String(stat.value || ''));
          setTempLabel(stat.label || '');
          setTempSuffix(stat.suffix || '');
          setIsEditing(true);
        }}
      >
        <div className={valueClassName}>
          {renderValue ? renderValue(stat) : `${stat.value?.toLocaleString()}${stat.suffix || ''}`}
        </div>
        <p className={labelClassName}>{stat.label}</p>
      </div>
    );
  }

  const handleSave = () => {
    set(contentPath, { ...stat, value: Number(tempValue) || 0, label: tempLabel, suffix: tempSuffix });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-2 z-20 relative border-2 border-blue-500">
      <div className="flex gap-2 items-center">
        <input type="number" value={tempValue} onChange={(e) => setTempValue(e.target.value)}
          className="w-24 px-2 py-1 border rounded text-sm text-gray-900" placeholder="Value" />
        <input type="text" value={tempSuffix} onChange={(e) => setTempSuffix(e.target.value)}
          className="w-12 px-2 py-1 border rounded text-sm text-gray-900" placeholder="+" />
      </div>
      <input type="text" value={tempLabel} onChange={(e) => setTempLabel(e.target.value)}
        className="w-full px-2 py-1 border rounded text-sm text-gray-900" placeholder="Label" />
      <div className="flex gap-2">
        <button onClick={handleSave} className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600">Save</button>
        <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300">Cancel</button>
      </div>
    </div>
  );
}
