import cn from 'classnames';
import { FC, PropsWithChildren, useEffect } from 'react';
import React from 'react';

import { useToastNotification } from '../../hooks/useToasNotification';
import styles from './toastNotification.module.scss';

export interface ToastNotificationProps extends PropsWithChildren {
  id: number;
  type: 'success' | 'error';
}

const ToastNotification: FC<ToastNotificationProps> = ({ children, id, type }) => {
  const { removeNotification } = useToastNotification();

  useEffect(() => {
    const timeout = setTimeout(() => removeNotification(id), 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.self}>
      <div
        className={cn(styles.stripe, { success: type === 'success', error: type === 'error' })}
      />
      <div className={styles.message}>{children}</div>
      <button onClick={() => removeNotification(id)} className={cn('icon', styles.close)}>
        close
      </button>
    </div>
  );
};

export default ToastNotification;
