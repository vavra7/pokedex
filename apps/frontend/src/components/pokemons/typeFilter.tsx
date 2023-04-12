import { useQuery } from '@apollo/client';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import React from 'react';

import { pokemonTypesQuery } from '../../api/pokemon.gql';
import { usePokemonGrid } from '../../hooks/usePokemonGrid';
import {
  PokemonTypesQuery,
  PokemonTypesQueryVariables
} from '../../types/__generated__/pokemon.gql.types';
import styles from './typeFilter.module.scss';

const TypeFilter: FC = () => {
  const { filters, setFilters } = usePokemonGrid();

  const [selectInput, setSelectInput] = useState<string>(filters.type || '');

  const { data } = useQuery<PokemonTypesQuery, PokemonTypesQueryVariables>(pokemonTypesQuery);

  useEffect(() => {
    if (selectInput === filters.type || (!selectInput && !filters.type)) return;
    setFilters({ ...filters, type: selectInput || undefined, page: 1 });
  }, [selectInput, filters, setFilters]);

  return (
    <div className={styles.self}>
      <select
        value={selectInput}
        onChange={e => setSelectInput(e.currentTarget.value)}
        className={cn(styles.self, { empty: !selectInput })}
      >
        <option
          disabled
          className={styles['empty-option']}
          value={'' === selectInput ? selectInput : undefined}
        >
          Type
        </option>
        {data &&
          data.pokemonTypes.map(type => (
            <option value={type === selectInput ? selectInput : undefined} label={type} key={type}>
              {type}
            </option>
          ))}
      </select>
      {selectInput && (
        <button className="icon" onClick={() => setSelectInput('')}>
          close
        </button>
      )}
    </div>
  );
};

export default TypeFilter;
