import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink = createHttpLink({
    uri: '/api/graphql', 
    fetch,
  })

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })

  nuxtApp.provide('apollo', apolloClient)
})
