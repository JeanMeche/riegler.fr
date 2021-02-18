import { AppProps } from 'next/app';
import Head from 'next/head';
import './App.css';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <>
    <Head>
      <title>Matt Riegler's <span role="img" aria-label="home emoji">🏡</span> page</title>
    </Head>
    <Component {...pageProps} />
  </>;
}
