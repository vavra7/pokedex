import cn from 'classnames';
import type { FC } from 'react';
import React from 'react';

import { usePokemonGrid } from '../../hooks/usePokemonGrid';
import styles from './pagination.module.scss';

const Pagination: FC = () => {
  const { pokemonConnection, filters, setFilters } = usePokemonGrid();

  if (!pokemonConnection) return null;

  const totalPages = Math.ceil(pokemonConnection.count / pokemonConnection.limit);
  const activePage = Math.floor(pokemonConnection.offset / pokemonConnection.limit) + 1;

  const handlePageClick = (page: number) => {
    setFilters({ ...filters, page });
  };

  const pageLinks = [];

  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(
      <a
        key={i}
        onClick={() => handlePageClick(i)}
        className={cn(styles.pageLink, {
          [styles.active]: i === activePage
        })}
      >
        {i}
      </a>
    );
  }

  return (
    <div className={styles.self}>
      <div className={styles.pagination}>
        {activePage > 1 && (
          <a onClick={() => handlePageClick(activePage - 1)} className="icon">
            chevron_left
          </a>
        )}
        {pageLinks}
        {activePage < totalPages && (
          <a onClick={() => handlePageClick(activePage + 1)} className="icon">
            chevron_right
          </a>
        )}
      </div>
    </div>
  );
};

export default Pagination;
