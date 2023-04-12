import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import styles from './row.module.scss';

const Row: FC<PropsWithChildren> = ({ children }) => {
  return <div className={cn('row', styles.self)}>{children}</div>;
};

export default Row;
