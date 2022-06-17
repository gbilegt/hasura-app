import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

function RenderApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <SessionProvider session={pageProps.session}>
          <ApolloProvider client={apolloClient}>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
        </ApolloProvider>
      </SessionProvider>
  )
}

export default RenderApp
