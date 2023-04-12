import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import styles from './plainLayout.module.scss';

const PlainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default PlainLayout;
