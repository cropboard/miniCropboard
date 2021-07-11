import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache()
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