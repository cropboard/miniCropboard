import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloLink } from "@apollo/client";

const authLink: ApolloLink = setContext((_, { headers }) => {
    const user = localStorage.getItem("user");

    return {
        headers: {
            ...headers,
            authorization: user ? `Bearer ${user}` : ""
        }
    }
})

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
    link: authLink
});

const App: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export { client };
export default App;