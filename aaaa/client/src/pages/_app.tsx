import Layout from '../Layout/Layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../../utils/react-query'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <script
            src={`https://api-maps.yandex.ru/2.1/?apikey=${process.env.MAPA_KEY}&lang=ru_RU`}
            type='text/javascript'
          ></script>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}
