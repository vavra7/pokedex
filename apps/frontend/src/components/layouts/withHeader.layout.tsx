import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import styles from './withHeaderLayout.module.scss';

export interface WithHeaderLayoutProps extends PropsWithChildren {
  header: React.ReactNode;
}

const withHeaderLayout: FC<WithHeaderLayoutProps> = ({ children, header }) => {
  return (
    <>
      <header className={styles.header}>{header}</header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default withHeaderLayout;
