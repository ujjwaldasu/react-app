import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {BrowserRouter} from 'react-router-dom'
import { HttpLink } from 'apollo-link-http'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: "http://localhost:3000/graphql",
});

const client = new ApolloClient({
    link,
    cache
});
ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();