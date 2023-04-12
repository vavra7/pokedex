import { NormalizedCacheObject, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { pokemonByNameQuery } from '../api/pokemon.gql';
import PlainLayout from '../components/layouts/plain.layout';
import PokemonDetail from '../components/pokemons/pokemonDetail';
import { apollo } from '../lib/apollo';
import {
  PokemonByNameQuery,
  PokemonByNameQueryVariables
} from '../types/__generated__/pokemon.gql.types';

export interface PokemonProps {
  APOLLO_CACHE: NormalizedCacheObject;
}

const Pokemon: NextPage<PokemonProps> = () => {
  const { query } = useRouter();

  const { data } = useQuery<PokemonByNameQuery, PokemonByNameQueryVariables>(pokemonByNameQuery, {
    variables: {
      name: query.name as string
    }
  });

  return (
    <>
      <Head>
        <title>{`Pokedex | ${data?.pokemonByName?.name}`}</title>
      </Head>
      <PlainLayout>
        <PokemonDetail />
      </PlainLayout>
    </>
  );
};

Pokemon.getInitialProps = async ({ query }) => {
  const apolloClient = apollo.getClient();
  await apolloClient.query<PokemonByNameQuery, PokemonByNameQueryVariables>({
    query: pokemonByNameQuery,
    variables: {
      name: query.name as string
    }
  });
  return {
    APOLLO_CACHE: apolloClient.cache.extract()
  };
};

export default Pokemon;
