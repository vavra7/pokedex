import cn from 'classnames';
import type { FC } from 'react';
import React from 'react';

import { PokemonFilters } from '../../contexts/pokemonGrid.context';
import { usePokemonGrid } from '../../hooks/usePokemonGrid';
import styles from './baseFilter.module.scss';

const BaseFilter: FC = () => {
  const { filters, setFilters } = usePokemonGrid();

  const handleClick = (partialFilters: Partial<PokemonFilters>) => {
    setFilters({ ...filters, ...partialFilters, page: 1 });
  };

  return (
    <>
      <button
        onClick={() => handleClick({ isFavorite: false })}
        className={cn(styles.button, { active: !filters.isFavorite })}
      >
        All
      </button>
      <button
        onClick={() => handleClick({ isFavorite: true })}
        className={cn(styles.button, { active: filters.isFavorite })}
      >
        Favorites
      </button>
    </>
  );
};

export default BaseFilter;
