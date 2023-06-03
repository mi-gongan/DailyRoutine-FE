import React, { useEffect } from 'react';
import App from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from 'src/components/styles/GlobalStyle';
import Head from 'next/head';
import dynamic from 'next/dynamic';

function app({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <meta property="og:title" content="Daily Routine" />
        <meta
          property="og:description"
          content="Bet your money on changing your habits!"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/image-upload-39ea1.appspot.com/o/images%2Fog%2Fog_img.png?alt=media&token=93041936-fed9-47b6-8289-4c72f7f33d78"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="modal-root" />
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
