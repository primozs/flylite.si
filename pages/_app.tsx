import type { AppProps } from 'next/app';
import GlobalStyles from './../styles/GlobalStyles';
import BaseMeta from 'app/BaseMeta';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseMeta />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
