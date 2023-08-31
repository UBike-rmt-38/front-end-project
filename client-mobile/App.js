import { Provider } from "react-redux";
import { store } from "./stores";
import AppNavigator from "./navigators/AppNavigator";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { baseURL } from "./constants/baseURL";
import { getValueFor } from "./helpers/secureStoreAction";

const httpLink = createHttpLink({
  uri: baseURL,
});

const getAuthToken = async () => {
  const result = await getValueFor("access_token");
  return result;
};

const authLink = setContext(async (_, { headers }) => {
  const access_token = await getAuthToken();
  // console.log(access_token);
  return {
    headers: {
      ...headers,
      authorization: access_token ? `${access_token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ApolloProvider>
  );
}
