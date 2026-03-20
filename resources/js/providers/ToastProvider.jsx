import { ToastViewport } from '@/components/ui/ToastViewPort';
import { ToastContext } from '@/context/ToastContext';
import { useCallback, useState } from 'react';

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 400);
  }, []);

  const addToast = useCallback(
    (toast) => {
      const id = toast.id ?? Math.random().toString(36).slice(2);
      const t = {
        id,
        title:       toast.title       ?? '',
        description: toast.description ?? '',
        type:        toast.type        ?? 'info',
        duration:    toast.duration    ?? 4500,
        action:      toast.action,
        leaving:     false,
      };
      setToasts((prev) => [...prev, t]);
      if (t.duration > 0) setTimeout(() => removeToast(id), t.duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastViewport toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}