import * as React from "react";
import { ApolloClient, createHttpLink, gql } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { onError, ErrorResponse } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { concatPagination } from "@apollo/client/utilities";

import { getSession } from "next-auth/react";

let apolloClient: ApolloClient<any>;

/**
 * Creates and configures the ApolloClient
 */
function createApolloClient() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allUsers: concatPagination(),
        },
      },
    },
  });

  const GRAPHQL_ENDPOINT = process.env.BACK_URL;

  const link = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  const authLink = setContext(async (_, { headers }) => {
    const session = await getSession();
    // console.log(operation.operationName, headers, session);
    const _headers: any = {
      ...headers,
    };

    if (session) {
      // _headers.authorization = `Bearer ${session.idToken}`;
      // _headers["x-session-id"] = session.sessid;
      // _headers["x-hasura-user-id"] = session.user.id;

      // if (!_headers["x-hasura-role"]) {
      //   _headers["x-hasura-role"] = session?.user?.role;
      // }
      // if (
      //   !_headers["x-hasura-organization-id"] &&
      //   session?.user?.organization
      // ) {
      //   _headers["x-hasura-organization-id"] = session?.user?.organization;
      // }
    }

    if (!_headers["x-hasura-role"]) {
      _headers["x-hasura-role"] = "anonymous";
    }

    // console.log("HEADERS =>", _headers);
    return {
      headers: _headers,
    };
  });

  const errorHandlerLink = onError(({ graphQLErrors }: ErrorResponse) => {
    // if (graphQLErrors) {
    //   for (let err of graphQLErrors) {
    //     if (err.extensions.code === "access-denied") {
    //       writeSessionError(
    //         client,
    //         "Өөр газраас давхар орсон тул энэ төхөөрөмж дээрээс гаргав!",
    //         403
    //       );
    //     }
    //   }
    // }
  });

  const httpLink = authLink.concat(errorHandlerLink.concat(link));

  const client = new ApolloClient({
    cache,
    link: httpLink,
    // connectToDevTools:
    //   process.env.NODE_ENV !== "production" && typeof window === "undefined",
    ssrMode: typeof window === "undefined",
    resolvers: {},
  });

  // write initial message
  // writeSessionError(client);

  return client;
}

// const writeSessionError = (client: any, message = "", code = 200) => {
//   client.writeQuery({
//     query: gql`
//       query CHECK_SESSION_ERROR {
//         SessionError @client {
//           message
//           code
//         }
//       }
//     `,
//     data: {
//       SessionError: {
//         __typename: "SessionError",
//         message,
//         code,
//       },
//     },
//   });
// };

export function initializeApollo(initialState?: any): ApolloClient<any> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = React.useMemo(
    () => initializeApollo(initialState),
    [initialState]
  );
  return store;
}
