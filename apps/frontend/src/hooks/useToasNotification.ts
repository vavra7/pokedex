import { useContext } from 'react';

import {
  ToastNotificationContext,
  ToastNotificationContextType
} from '../contexts/toastNotification.context';

export function useToastNotification(): ToastNotificationContextType {
  const context = useContext(ToastNotificationContext);
  if (!context) {
    throw new Error('useToastNotification must be used within a ToastNotificationProvider');
  }
  return context;
}
