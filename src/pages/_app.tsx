import type { AppProps } from 'next/app'
import '../css/globals.css'
import '../utils/database'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
