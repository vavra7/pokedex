import { useContext } from 'react';

import { PokemonGridContext, PokemonGridContextType } from '../contexts/pokemonGrid.context';

export function usePokemonGrid(): PokemonGridContextType {
  const context = useContext(PokemonGridContext);
  if (!context) {
    throw new Error('usePokemonGrid must be used within a PokemonGridProvider');
  }
  return context;
}
