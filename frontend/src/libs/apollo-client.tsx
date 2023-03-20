import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { API_HOST } from "./constants";
import { AppDispatch } from "../store/store";
import { onError } from "@apollo/client/link/error";
import { showErrorToast } from "./toast";
import { STORAGE_KEY } from "../utils/constants";

export const getClient = (dispatch: AppDispatch) => {
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${localStorage.getItem(STORAGE_KEY.USER_TOKEN)}`,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: API_HOST,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions?.code) {
          case "INTERNAL_SERVER_ERROR": {
            showErrorToast(`${err.message}`);
            break;
          }
        }
      }

      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    connectToDevTools: true,
  });
};
