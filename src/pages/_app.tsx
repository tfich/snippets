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
