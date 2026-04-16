import { useEffect, useState } from 'react';
import { toastManager, ToastContainer, ToastProps } from './Toast';

export function GlobalToastContainer() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  return <ToastContainer toasts={toasts} />;
}
