import '../assets/styles/globals.scss';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ToastNotificationProvider } from '../contexts/toastNotification.context';
import { apollo } from '../lib/apollo';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = apollo.getClient(pageProps.APOLLO_CACHE);

  return (
    <>
      <Head>
        <meta name="description" content="Pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ToastNotificationProvider>
          <Component {...pageProps} />
        </ToastNotificationProvider>
      </ApolloProvider>
    </>
  );
}
