import { ChakraProvider } from '@chakra-ui/react';
import { APP_NAME } from '@weather/configs';
import '@weather/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
