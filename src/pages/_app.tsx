import React, { useEffect } from 'react';
import App from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from 'src/components/styles/GlobalStyle';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { baseUri } from 'src/utils';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function app({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Head>
          <meta property="og:title" content="Daily Routine" />
          <meta
            property="og:description"
            content="Bet your money on changing your habits!"
          />
          <meta
            property="og:image"
            content={baseUri + '/images/thumbnail.png'}
          />
          <link rel="shortcut icon" href="/images/favicon.svg" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
        <div id="modal-root" />
      </RecoilRoot>
    </ChakraProvider>
  );
}

app.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default dynamic(() => Promise.resolve(app), {
  ssr: false,
});
