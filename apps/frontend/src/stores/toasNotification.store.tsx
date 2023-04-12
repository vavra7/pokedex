import { Store } from '../types/store.types';

export interface ToastNotification {
  id: number;
  type: 'success' | 'error';
  message: string;
  removed: boolean;
}

let state: Store<ToastNotification[]>['state'] = [];

const listeners: Store<ToastNotification[]>['listeners'] = new Set();

const setState: Store<ToastNotification[]>['setState'] = newStateOrFce => {
  if (typeof newStateOrFce === 'function') {
    state = newStateOrFce(state);
  } else {
    state = newStateOrFce;
  }
  listeners.forEach(listener => listener(state));
};

const getState: Store<ToastNotification[]>['getState'] = () => state;

const subscribe: Store<ToastNotification[]>['subscribe'] = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const toastNotificationStore: Store<ToastNotification[]> = {
  state,
  listeners,
  setState,
  getState,
  subscribe
};
