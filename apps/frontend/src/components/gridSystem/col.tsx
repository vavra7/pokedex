import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import styles from './col.module.scss';

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColProps extends PropsWithChildren {
  sm?: ColSpan;
  md?: ColSpan;
  lg?: ColSpan;
  xl?: ColSpan;
}

const Col: FC<ColProps> = ({ children, sm, md, lg, xl }) => {
  return (
    <div
      className={cn('col', styles.self, {
        [styles[`sm-${sm}`]]: sm,
        [styles[`md-${md}`]]: md,
        [styles[`lg-${lg}`]]: lg,
        [styles[`xl-${xl}`]]: xl
      })}
    >
      {children}
    </div>
  );
};

export default Col;
