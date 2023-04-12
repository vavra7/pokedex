import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { createContext, FC, PropsWithChildren, useCallback, useState } from 'react';

import { pokemonsQuery } from '../api/pokemon.gql';
import {
  PokemonConnectionFragment,
  PokemonsQuery,
  PokemonsQueryVariables
} from '../types/__generated__/pokemon.gql.types';

export type PokemonFilters = {
  search?: string;
  type?: string;
  isFavorite?: boolean;
  page: number;
  limit: number;
};

export interface PokemonGridContextType {
  pokemonConnection?: PokemonConnectionFragment;
  setFilters: (filters: PokemonFilters) => void;
  filters: PokemonFilters;
  displayAsList: boolean;
  setDisplayAsList: (displayAsList: boolean) => void;
  loading: boolean;
}

export const PokemonGridContext = createContext<PokemonGridContextType | undefined>(undefined);

export const PokemonGridProvider: FC<PropsWithChildren> = ({ children }) => {
  const { query, push } = useRouter();

  const [filters, _setFilters] = useState<PokemonFilters>({
    ...(query.isFavorite && { isFavorite: Boolean(query.isFavorite) }),
    ...(typeof query.type === 'string' && { type: query.type }),
    ...(typeof query.search === 'string' && { search: query.search }),
    page: (typeof query.page === 'string' && parseInt(query.page)) || 1,
    limit: (typeof query.limit === 'string' && parseInt(query.limit)) || 20
  });

  const [displayAsList, _setDisplayAsList] = useState(
    typeof query.displayAsList === 'string' ? Boolean(query.displayAsList) : false
  );

  const { loading, data, previousData, refetch } = useQuery<PokemonsQuery, PokemonsQueryVariables>(
    pokemonsQuery,
    {
      variables: {
        query: {
          filter: {
            ...(filters.isFavorite && { isFavorite: filters.isFavorite }),
            ...(filters.type && { type: filters.type })
          },
          limit: filters.limit,
          offset: filters.page * filters.limit - filters.limit,
          search: filters.search || undefined
        }
      },
      fetchPolicy: 'cache-first'
    }
  );

  const updateQueryParams = (filters: PokemonFilters, displayAsList: boolean) => {
    if (typeof window === 'undefined') return;
    push({
      query: {
        ...(filters.search && { search: filters.search }),
        ...(filters.type && { type: filters.type }),
        ...(filters.isFavorite && { isFavorite: filters.isFavorite }),
        ...(displayAsList && { displayAsList: displayAsList }),
        ...(filters.page && { page: filters.page }),
        ...(filters.limit && { limit: filters.limit })
      }
    });
  };

  const setFilters = useCallback<PokemonGridContextType['setFilters']>(
    filters => {
      refetch({
        query: {
          filter: {
            isFavorite: filters.isFavorite ? true : undefined,
            type: filters.type
          },
          limit: filters.limit,
          offset: filters.page * filters.limit - filters.limit,
          search: filters.search
        }
      });
      _setFilters(filters);

      updateQueryParams(filters, displayAsList);
    },
    [_setFilters, refetch, displayAsList]
  );

  const setDisplayAsList = useCallback<PokemonGridContextType['setDisplayAsList']>(
    displayAsList => {
      _setDisplayAsList(displayAsList);
      updateQueryParams(filters, displayAsList);
    },
    [_setDisplayAsList, filters]
  );

  return (
    <PokemonGridContext.Provider
      value={{
        pokemonConnection: data?.pokemons || previousData?.pokemons,
        setFilters,
        loading,
        filters,
        displayAsList,
        setDisplayAsList
      }}
    >
      {children}
    </PokemonGridContext.Provider>
  );
};
