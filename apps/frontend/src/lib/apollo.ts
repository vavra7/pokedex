import type { InMemoryCacheConfig, NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { config } from '../config';
import { toastNotificationStore } from '../stores/toasNotification.store';
import { QueryPokemonByIdArgs, QueryPokemonByNameArgs } from '../types/__generated__/gql.types';
import { TypedTypePolicies } from '../types/__generated__/gqlHelpers.types';

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    toastNotificationStore.setState(prev => [
      ...prev,
      {
        id: prev.length + 1,
        removed: false,
        message: graphQLErrors[0].message,
        type: 'error'
      }
    ]);
  } else if (networkError) {
    toastNotificationStore.setState(prev => [
      ...prev,
      {
        id: prev.length + 1,
        removed: false,
        message: networkError.message,
        type: 'error'
      }
    ]);
  }
});

const httpLink = new HttpLink({
  uri: `${config.apiUrl}/graphql`
});

function getClient(cache?: NormalizedCacheObject): ApolloClient<NormalizedCacheObject> {
  if (typeof window !== 'undefined' && client) {
    return client;
  } else {
    return (client = initClient(cache));
  }
}

/**
 * This function gets the cache configuration for the in-memory cache.
 * The cache configuration specifies how the cache behaves.
 */
function getCacheConfig(): InMemoryCacheConfig {
  const typePolicies: TypedTypePolicies = {
    Query: {
      fields: {
        pokemonByName: {
          read: (existingRef, options) => {
            const args = options.args as QueryPokemonByNameArgs;
            const normalizedCacheObject = options.cache.extract();
            for (const __ref in normalizedCacheObject) {
              if (
                normalizedCacheObject[__ref]?.__typename === 'Pokemon' &&
                typeof normalizedCacheObject[__ref]?.name === 'string' &&
                typeof args.name === 'string' &&
                (normalizedCacheObject[__ref]?.name as string).toLowerCase() ===
                  args.name.toLowerCase()
              ) {
                return { __ref };
              }
            }
          }
        },
        pokemonById: {
          read: (existingRef, options) => {
            const args = options.args as QueryPokemonByIdArgs;
            return { __ref: `Pokemon:${args.id}` };
          }
        }
      }
    }
  };
  const config: InMemoryCacheConfig = { typePolicies };
  return config;
}

/**
 * This function initializes a new Apollo client to be used to communicate with the server.
 * The optional parameter `cache` can be used to initialize the cache with data.
 */
function initClient(cache?: NormalizedCacheObject): ApolloClient<NormalizedCacheObject> {
  const newClient = new ApolloClient({
    cache: new InMemoryCache(getCacheConfig()),
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink])
  });
  if (cache) {
    newClient.cache.restore(cache);
  }
  return newClient;
}

export const apollo = {
  getClient
};
