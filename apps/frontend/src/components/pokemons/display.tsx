import cn from 'classnames';
import type { FC } from 'react';
import React from 'react';

import { usePokemonGrid } from '../../hooks/usePokemonGrid';
import styles from './display.module.scss';

const Display: FC = () => {
  const { setDisplayAsList } = usePokemonGrid();

  return (
    <>
      <button onClick={() => setDisplayAsList(true)} className={cn(styles.button, 'icon')}>
        view_headline
      </button>
      <div className={styles.divider} />
      <button onClick={() => setDisplayAsList(false)} className={cn(styles.button, 'icon', 'fill')}>
        view_module
      </button>
    </>
  );
};

export default Display;
