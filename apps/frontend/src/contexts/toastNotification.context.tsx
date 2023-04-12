import { createContext, FC, PropsWithChildren, useCallback, useSyncExternalStore } from 'react';

import ToastNotification from '../components/common/toastNotification';
import { toastNotificationStore } from '../stores/toasNotification.store';

export interface ToastNotificationInput {
  type: 'success' | 'error';
  message: string;
}

export interface ToastNotificationContextType {
  addNotification: (notification: ToastNotificationInput) => void;
  removeNotification: (id: number) => void;
}

export const ToastNotificationContext = createContext<ToastNotificationContextType | undefined>(
  undefined
);

export const ToastNotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const notifications = useSyncExternalStore(
    toastNotificationStore.subscribe,
    toastNotificationStore.getState,
    toastNotificationStore.getState
  );

  const addNotification = useCallback<ToastNotificationContextType['addNotification']>(input => {
    toastNotificationStore.setState(prev => [
      ...prev,
      {
        id: prev.length + 1,
        removed: false,
        ...input
      }
    ]);
  }, []);

  const removeNotification = useCallback<ToastNotificationContextType['removeNotification']>(id => {
    toastNotificationStore.setState(prev =>
      prev.map(n => (n.id === id ? { ...n, removed: true } : n))
    );
  }, []);

  return (
    <ToastNotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div
        id="toast-notifications"
        style={{ position: 'fixed', bottom: 0, right: 0, maxWidth: '100%' }}
      >
        {notifications
          .filter(n => !n.removed)
          .map(n => (
            <ToastNotification key={n.id} type={n.type} id={n.id}>
              {n.message}
            </ToastNotification>
          ))}
      </div>
    </ToastNotificationContext.Provider>
  );
};
