import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../css/globals.css'
import '../utils/database'

const DEFAULT_TITLE = 'snippets'
const DESCRIPTION = 'A simple way to share code snippets with peers in over 115 programming languages'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <title>{DEFAULT_TITLE}</title>
        <meta content={DESCRIPTION} name="description" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={DEFAULT_TITLE} />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
