'use client';

import { useContent } from '@/context/ContentContext';
import { FaArrowUp, FaArrowDown, FaTrash, FaPlus } from 'react-icons/fa';

export default function EditableList({
  contentPath,
  renderItem,
  itemTemplate = {},
  className = '',
  addLabel = 'Add Item',
}) {
  const { get, addListItem, removeListItem, moveListItem, isEditMode } = useContent();
  const items = get(contentPath) || [];

  if (!isEditMode) {
    return (
      <div className={className}>
        {items.map((item, index) => renderItem(item, index))}
      </div>
    );
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={item.id || index} className="relative group/listitem">
          {renderItem(item, index)}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover/listitem:opacity-100 transition-opacity flex gap-1 z-30">
            <button onClick={() => moveListItem(contentPath, index, 'up')} disabled={index === 0}
              className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600 disabled:opacity-30 shadow-md" title="Move up">
              <FaArrowUp size={10} />
            </button>
            <button onClick={() => moveListItem(contentPath, index, 'down')} disabled={index === items.length - 1}
              className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600 disabled:opacity-30 shadow-md" title="Move down">
              <FaArrowDown size={10} />
            </button>
            <button onClick={() => { if (window.confirm('Delete this item?')) removeListItem(contentPath, index); }}
              className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shadow-md" title="Delete">
              <FaTrash size={10} />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => addListItem(contentPath, { ...itemTemplate, id: itemTemplate.id || `item-${Date.now()}` })}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors border-2 border-dashed border-blue-300"
      >
        <FaPlus size={12} />
        {addLabel}
      </button>
    </div>
  );
}
