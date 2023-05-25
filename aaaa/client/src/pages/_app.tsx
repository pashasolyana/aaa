import Layout from '../Layout/Layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../../utils/react-query'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}
