import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

const authLink = setContext((_, { headers }) => {
  const access_token = getAuthToken();
  return {
    headers: {
      ...headers,
      authorization: access_token ? `${access_token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
