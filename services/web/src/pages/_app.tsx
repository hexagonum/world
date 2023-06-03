import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { APP_NAME } from '@world/configs';
import { apolloClient } from '@world/graphql';
import '@world/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
