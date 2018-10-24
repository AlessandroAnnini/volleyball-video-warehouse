import React from 'react';
import ReactDOM from 'react-dom';

import TProvider, { TContext } from './context';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import './styles.css';

// import registerServiceWorker from './registerServiceWorker';

const TConsumer = TContext.Consumer;

// Replace this with your project's endpoint
const GRAPHCMS_API =
  'https://api-euwest.graphcms.com/v1/cjnln6b334rsx01gh7bzmok2p/master';

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

ReactDOM.render(
  <TProvider>
    <TConsumer>
      {({ store }) => (
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      )}
    </TConsumer>
  </TProvider>,
  document.getElementById('root')
);
// registerServiceWorker();
