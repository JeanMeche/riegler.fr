import { AppProps } from 'next/app';
import Head from 'next/head';
import './App.css';

/*  eslint-disable jsx-a11y/accessible-emoji */
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Matt Riegler's 🏡 page </title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
