import type { FC } from 'react';
import React from 'react';

import styles from './progressLinear.module.scss';

const ProgressLinear: FC = () => {
  return (
    <div className={styles.self}>
      <div className={styles.buffer} />
    </div>
  );
};

export default ProgressLinear;
