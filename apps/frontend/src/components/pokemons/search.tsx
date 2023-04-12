import { FC, useEffect, useRef, useState } from 'react';
import React from 'react';

import { usePokemonGrid } from '../../hooks/usePokemonGrid';
import styles from './search.module.scss';

const Search: FC = () => {
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { filters, setFilters } = usePokemonGrid();

  const [searchInput, setSearchInput] = useState(filters.search || '');

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (searchInput === filters.search || (!searchInput && !filters.search)) return;
    searchTimeoutRef.current = setTimeout(() => {
      setFilters({ ...filters, search: searchInput || undefined, page: 1 });
    }, 500);
  }, [searchInput, filters, setFilters]);

  return (
    <input
      className={styles.self}
      type="search"
      placeholder="Search"
      value={searchInput}
      onChange={e => setSearchInput(e.currentTarget.value)}
    />
  );
};

export default Search;
