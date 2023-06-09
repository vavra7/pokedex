import * as Types from './gql.types';

/**
 *  ⚠️ DO NOT EDIT ⚠️
 *  This file is automatically generated, run "yarn codegen" to update
 */

export type PokemonFragment = {
  __typename?: 'Pokemon';
  classification: string;
  fleeRate: number;
  id: string;
  image: string;
  isFavorite: boolean;
  maxCP: number;
  maxHP: number;
  name: string;
  number: number;
  resistant: Array<string>;
  sound: string;
  types: Array<string>;
  weaknesses: Array<string>;
  attacks: {
    __typename?: 'PokemonAttack';
    fast: Array<{ __typename?: 'Attack'; damage: number; name: string; type: string }>;
    special: Array<{ __typename?: 'Attack'; name: string; damage: number; type: string }>;
  };
  evolutionRequirements?: {
    __typename?: 'PokemonEvolutionRequirement';
    amount: number;
    name: string;
  } | null;
  weight: { __typename?: 'PokemonDimension'; maximum: string; minimum: string };
  height: { __typename?: 'PokemonDimension'; minimum: string; maximum: string };
  evolutions: Array<{
    __typename?: 'Pokemon';
    id: string;
    name: string;
    image: string;
    isFavorite: boolean;
  }>;
};

export type PokemonConnectionFragment = {
  __typename?: 'PokemonConnection';
  limit: number;
  offset: number;
  count: number;
  edges: Array<{
    __typename?: 'Pokemon';
    classification: string;
    fleeRate: number;
    id: string;
    image: string;
    isFavorite: boolean;
    maxCP: number;
    maxHP: number;
    name: string;
    number: number;
    resistant: Array<string>;
    sound: string;
    types: Array<string>;
    weaknesses: Array<string>;
    attacks: {
      __typename?: 'PokemonAttack';
      fast: Array<{ __typename?: 'Attack'; damage: number; name: string; type: string }>;
      special: Array<{ __typename?: 'Attack'; name: string; damage: number; type: string }>;
    };
    evolutionRequirements?: {
      __typename?: 'PokemonEvolutionRequirement';
      amount: number;
      name: string;
    } | null;
    weight: { __typename?: 'PokemonDimension'; maximum: string; minimum: string };
    height: { __typename?: 'PokemonDimension'; minimum: string; maximum: string };
    evolutions: Array<{
      __typename?: 'Pokemon';
      id: string;
      name: string;
      image: string;
      isFavorite: boolean;
    }>;
  }>;
};

export type PokemonsQueryVariables = Types.Exact<{
  query: Types.PokemonsQueryInput;
}>;

export type PokemonsQuery = {
  __typename?: 'Query';
  pokemons: {
    __typename?: 'PokemonConnection';
    limit: number;
    offset: number;
    count: number;
    edges: Array<{
      __typename?: 'Pokemon';
      classification: string;
      fleeRate: number;
      id: string;
      image: string;
      isFavorite: boolean;
      maxCP: number;
      maxHP: number;
      name: string;
      number: number;
      resistant: Array<string>;
      sound: string;
      types: Array<string>;
      weaknesses: Array<string>;
      attacks: {
        __typename?: 'PokemonAttack';
        fast: Array<{ __typename?: 'Attack'; damage: number; name: string; type: string }>;
        special: Array<{ __typename?: 'Attack'; name: string; damage: number; type: string }>;
      };
      evolutionRequirements?: {
        __typename?: 'PokemonEvolutionRequirement';
        amount: number;
        name: string;
      } | null;
      weight: { __typename?: 'PokemonDimension'; maximum: string; minimum: string };
      height: { __typename?: 'PokemonDimension'; minimum: string; maximum: string };
      evolutions: Array<{
        __typename?: 'Pokemon';
        id: string;
        name: string;
        image: string;
        isFavorite: boolean;
      }>;
    }>;
  };
};

export type PokemonByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type PokemonByIdQuery = {
  __typename?: 'Query';
  pokemonById?: {
    __typename?: 'Pokemon';
    classification: string;
    fleeRate: number;
    id: string;
    image: string;
    isFavorite: boolean;
    maxCP: number;
    maxHP: number;
    name: string;
    number: number;
    resistant: Array<string>;
    sound: string;
    types: Array<string>;
    weaknesses: Array<string>;
    attacks: {
      __typename?: 'PokemonAttack';
      fast: Array<{ __typename?: 'Attack'; damage: number; name: string; type: string }>;
      special: Array<{ __typename?: 'Attack'; name: string; damage: number; type: string }>;
    };
    evolutionRequirements?: {
      __typename?: 'PokemonEvolutionRequirement';
      amount: number;
      name: string;
    } | null;
    weight: { __typename?: 'PokemonDimension'; maximum: string; minimum: string };
    height: { __typename?: 'PokemonDimension'; minimum: string; maximum: string };
    evolutions: Array<{
      __typename?: 'Pokemon';
      id: string;
      name: string;
      image: string;
      isFavorite: boolean;
    }>;
  } | null;
};

export type PokemonByNameQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;

export type PokemonByNameQuery = {
  __typename?: 'Query';
  pokemonByName?: {
    __typename?: 'Pokemon';
    classification: string;
    fleeRate: number;
    id: string;
    image: string;
    isFavorite: boolean;
    maxCP: number;
    maxHP: number;
    name: string;
    number: number;
    resistant: Array<string>;
    sound: string;
    types: Array<string>;
    weaknesses: Array<string>;
    attacks: {
      __typename?: 'PokemonAttack';
      fast: Array<{ __typename?: 'Attack'; damage: number; name: string; type: string }>;
      special: Array<{ __typename?: 'Attack'; name: string; damage: number; type: string }>;
    };
    evolutionRequirements?: {
      __typename?: 'PokemonEvolutionRequirement';
      amount: number;
      name: string;
    } | null;
    weight: { __typename?: 'PokemonDimension'; maximum: string; minimum: string };
    height: { __typename?: 'PokemonDimension'; minimum: string; maximum: string };
    evolutions: Array<{
      __typename?: 'Pokemon';
      id: string;
      name: string;
      image: string;
      isFavorite: boolean;
    }>;
  } | null;
};

export type PokemonTypesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PokemonTypesQuery = { __typename?: 'Query'; pokemonTypes: Array<string> };

export type FavoritePokemonMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type FavoritePokemonMutation = {
  __typename?: 'Mutation';
  favoritePokemon?: { __typename?: 'Pokemon'; id: string; isFavorite: boolean } | null;
};

export type UnfavoritePokemonMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type UnfavoritePokemonMutation = {
  __typename?: 'Mutation';
  unFavoritePokemon?: { __typename?: 'Pokemon'; id: string; isFavorite: boolean } | null;
};
