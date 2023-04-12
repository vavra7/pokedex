import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import styles from './container.module.scss';

export interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={cn('container', styles.self, className)}>{children}</div>;
};

export default Container;
