'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { FaUndo, FaRedo, FaSave, FaDownload, FaTrashRestore, FaArrowLeft } from 'react-icons/fa';

export default function AdminToolbar() {
  const { isDirty, canUndo, canRedo, undo, redo, save, reset, exportJson } = useContent();
  const [toast, setToast] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleSave = useCallback(() => { save(); showToast('Changes saved!'); }, [save, showToast]);
  const handleExport = useCallback(() => { exportJson(); showToast('content.json exported!'); }, [exportJson, showToast]);
  const handleReset = useCallback(() => { reset(); setShowResetConfirm(false); showToast('Reset to original content'); }, [reset, showToast]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); handleSave(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo, handleSave]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 h-12 flex items-center px-4 gap-3">
        <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mr-2">
          <FaArrowLeft size={12} /> Admin
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">Content Editor</span>
        </div>
        {isDirty && (
          <span className="text-yellow-400 text-xs bg-yellow-400/10 px-2 py-0.5 rounded-full">Unsaved changes</span>
        )}
        <div className="flex-1" />
        <div className="flex items-center gap-1">
          <ToolbarButton icon={FaUndo} label="Undo" shortcut="Ctrl+Z" onClick={undo} disabled={!canUndo} />
          <ToolbarButton icon={FaRedo} label="Redo" shortcut="Ctrl+Shift+Z" onClick={redo} disabled={!canRedo} />
          <div className="w-px h-6 bg-gray-700 mx-1" />
          <ToolbarButton icon={FaTrashRestore} label="Reset" onClick={() => setShowResetConfirm(true)} />
          <ToolbarButton icon={FaDownload} label="Export" onClick={handleExport} />
          <button onClick={handleSave}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors ml-1">
            <FaSave size={12} /> Save
          </button>
        </div>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Reset Content?</h3>
            <p className="text-gray-600 text-sm mb-6">This will discard all changes and revert to the original content.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
              <button onClick={handleReset} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">Reset</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] bg-gray-900 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium animate-fade-in">
          {toast}
        </div>
      )}
    </>
  );
}

function ToolbarButton({ icon: Icon, label, shortcut, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} title={shortcut ? `${label} (${shortcut})` : label}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
      <Icon size={14} />
    </button>
  );
}
