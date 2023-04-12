import { FC } from 'react';
import React from 'react';

import { usePokemonGrid } from '../../hooks/usePokemonGrid';
import ProgressLinear from '../common/progressLinear';
import { Container } from '../gridSystem';
import BaseFilter from './baseFilter';
import Display from './display';
import styles from './pokemonsGridHeader.module.scss';
import Search from './search';
import TypeFilter from './typeFilter';

const PokemonsGridHeader: FC = () => {
  const { loading } = usePokemonGrid();

  return (
    <div className={styles.self}>
      <Container className={styles.container}>
        <div className={styles['base-filter']}>
          <BaseFilter />
        </div>
        <div className={styles.search}>
          <Search />
        </div>
        <div className={styles['type-filter']}>
          <TypeFilter />
        </div>
        <div className={styles.display}>
          <Display />
        </div>
      </Container>
      <div className={styles.loader}>{loading && <ProgressLinear />}</div>
    </div>
  );
};

export default PokemonsGridHeader;
