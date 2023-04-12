import { NormalizedCacheObject } from '@apollo/client';
import { NextPage } from 'next';
import Head from 'next/head';

import { pokemonsQuery } from '../api/pokemon.gql';
import WithHeaderLayout from '../components/layouts/withHeader.layout';
import PokemonsGrid from '../components/pokemons/pokemonsGrid';
import PokemonsGridHeader from '../components/pokemons/pokemonsGridHeader';
import { PokemonFilters, PokemonGridProvider } from '../contexts/pokemonGrid.context';
import { apollo } from '../lib/apollo';
import { PokemonsQuery, PokemonsQueryVariables } from '../types/__generated__/pokemon.gql.types';

export interface HomeProps {
  APOLLO_CACHE: NormalizedCacheObject;
}

const Home: NextPage<HomeProps> = () => {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <PokemonGridProvider>
        <WithHeaderLayout header={<PokemonsGridHeader />}>
          <PokemonsGrid />
        </WithHeaderLayout>
      </PokemonGridProvider>
    </>
  );
};

Home.getInitialProps = async ({ query }) => {
  const apolloClient = apollo.getClient();
  const filter: PokemonFilters = {
    ...(query.isFavorite && { isFavorite: Boolean(query.isFavorite) }),
    ...(typeof query.type === 'string' && { type: query.type }),
    ...(typeof query.search === 'string' && { search: query.search }),
    page: (typeof query.page === 'string' && parseInt(query.page)) || 1,
    limit: (typeof query.limit === 'string' && parseInt(query.limit)) || 20
  };
  await apolloClient.query<PokemonsQuery, PokemonsQueryVariables>({
    query: pokemonsQuery,
    variables: {
      query: {
        filter: {
          isFavorite: filter.isFavorite,
          type: filter.type
        },
        limit: filter.limit,
        offset: filter.page * filter.limit - filter.limit,
        search: filter.search
      }
    }
  });
  return {
    APOLLO_CACHE: apolloClient.cache.extract()
  };
};

export default Home;
