import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { theme } from './theme';
import Layout from './layout/Layout';

ReactDOM.render(
  <React.StrictMode>

    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <App />
      </Layout>
    </ChakraProvider>

  </React.StrictMode>,
  document.getElementById('root'),
);
