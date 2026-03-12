'use client';

import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';

const ContentContext = createContext(null);

const STORAGE_KEY = 'akp-cms-content';
const MAX_HISTORY = 50;

function getByPath(obj, path) {
  return path.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((acc, key) => {
    if (acc == null) return undefined;
    return acc[key];
  }, obj);
}

function setByPath(obj, path, value) {
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = Array.isArray(current[key])
      ? [...current[key]]
      : { ...current[key] };
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

function contentReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const newContent = setByPath(state.content, action.path, action.value);
      return {
        ...state,
        content: newContent,
        undoStack: [...state.undoStack, state.content].slice(-MAX_HISTORY),
        redoStack: [],
        isDirty: true,
      };
    }
    case 'ADD_LIST_ITEM': {
      const list = [...(getByPath(state.content, action.path) || [])];
      list.push(action.item);
      const newContent = setByPath(state.content, action.path, list);
      return {
        ...state,
        content: newContent,
        undoStack: [...state.undoStack, state.content].slice(-MAX_HISTORY),
        redoStack: [],
        isDirty: true,
      };
    }
    case 'REMOVE_LIST_ITEM': {
      const list = [...(getByPath(state.content, action.path) || [])];
      list.splice(action.index, 1);
      const newContent = setByPath(state.content, action.path, list);
      return {
        ...state,
        content: newContent,
        undoStack: [...state.undoStack, state.content].slice(-MAX_HISTORY),
        redoStack: [],
        isDirty: true,
      };
    }
    case 'MOVE_LIST_ITEM': {
      const list = [...(getByPath(state.content, action.path) || [])];
      const { index, direction } = action;
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= list.length) return state;
      [list[index], list[newIndex]] = [list[newIndex], list[index]];
      const newContent = setByPath(state.content, action.path, list);
      return {
        ...state,
        content: newContent,
        undoStack: [...state.undoStack, state.content].slice(-MAX_HISTORY),
        redoStack: [],
        isDirty: true,
      };
    }
    case 'UNDO': {
      if (state.undoStack.length === 0) return state;
      const prev = state.undoStack[state.undoStack.length - 1];
      return {
        ...state,
        content: prev,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [...state.redoStack, state.content],
        isDirty: true,
      };
    }
    case 'REDO': {
      if (state.redoStack.length === 0) return state;
      const next = state.redoStack[state.redoStack.length - 1];
      return {
        ...state,
        content: next,
        undoStack: [...state.undoStack, state.content],
        redoStack: state.redoStack.slice(0, -1),
        isDirty: true,
      };
    }
    case 'RESET': {
      return {
        ...state,
        content: action.initialContent,
        undoStack: [],
        redoStack: [],
        isDirty: false,
      };
    }
    case 'MARK_SAVED': {
      return { ...state, isDirty: false };
    }
    default:
      return state;
  }
}

export function ContentProvider({ children, initialContent, editMode = false }) {
  const initialContentRef = useRef(initialContent);

  const [state, dispatch] = useReducer(contentReducer, {
    content: initialContent,
    undoStack: [],
    redoStack: [],
    isDirty: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that parsed content has essential keys before overriding
        if (parsed && typeof parsed === 'object' && parsed.hero && parsed.siteConfig) {
          dispatch({ type: 'RESET', initialContent: parsed });
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !state.isDirty) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.content));
    } catch {}
  }, [state.content, state.isDirty]);

  useEffect(() => {
    if (!editMode || !state.isDirty) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [editMode, state.isDirty]);

  const get = useCallback(
    (path) => (path ? getByPath(state.content, path) : state.content),
    [state.content]
  );

  const set = useCallback(
    (path, value) => dispatch({ type: 'SET_FIELD', path, value }),
    []
  );

  const addListItem = useCallback(
    (path, item) => dispatch({ type: 'ADD_LIST_ITEM', path, item }),
    []
  );

  const removeListItem = useCallback(
    (path, index) => dispatch({ type: 'REMOVE_LIST_ITEM', path, index }),
    []
  );

  const moveListItem = useCallback(
    (path, index, direction) =>
      dispatch({ type: 'MOVE_LIST_ITEM', path, index, direction }),
    []
  );

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET', initialContent: initialContentRef.current });
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const save = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.content));
      dispatch({ type: 'MARK_SAVED' });
    } catch {}
  }, [state.content]);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(state.content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [state.content]);

  const value = {
    content: state.content,
    get,
    set,
    addListItem,
    removeListItem,
    moveListItem,
    isEditMode: editMode,
    isDirty: state.isDirty,
    undo,
    redo,
    canUndo: state.undoStack.length > 0,
    canRedo: state.redoStack.length > 0,
    save,
    reset,
    exportJson,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
