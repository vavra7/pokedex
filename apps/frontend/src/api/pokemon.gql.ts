import { gql } from '@apollo/client';

// fragments

export const pokemonFragment = gql`
  fragment Pokemon on Pokemon {
    attacks {
      fast {
        damage
        name
        type
      }
      special {
        name
        damage
        type
      }
    }
    classification
    evolutionRequirements {
      amount
      name
    }
    fleeRate
    id
    image
    isFavorite
    maxCP
    maxHP
    name
    number
    resistant
    sound
    types
    weaknesses
    weight {
      maximum
      minimum
    }
    height {
      minimum
      maximum
    }
    evolutions {
      id
      name
      image
      isFavorite
    }
  }
`;

export const pokemonConnectionFragment = gql`
  fragment PokemonConnection on PokemonConnection {
    limit
    offset
    count
    edges {
      ...Pokemon
    }
  }
  ${pokemonFragment}
`;

// queries

export const pokemonsQuery = gql`
  query Pokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      ...PokemonConnection
    }
  }
  ${pokemonConnectionFragment}
`;

export const pokemonByIdQuery = gql`
  query PokemonById($id: ID!) {
    pokemonById(id: $id) {
      ...Pokemon
    }
  }
  ${pokemonFragment}
`;

export const pokemonByNameQuery = gql`
  query PokemonByName($name: String!) {
    pokemonByName(name: $name) {
      ...Pokemon
    }
  }
  ${pokemonFragment}
`;

export const pokemonTypesQuery = gql`
  query PokemonTypes {
    pokemonTypes
  }
`;

// mutations

export const favoritePokemonMutation = gql`
  mutation FavoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`;

export const unfavoritePokemonMutation = gql`
  mutation UnfavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`;
