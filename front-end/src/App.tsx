import React from 'react';
import { TokenProvider } from './context/Token';
import AppRoutes from './routes';

function App() {
  return (
    <TokenProvider>
      <AppRoutes />
    </TokenProvider>

  );
}

export default App;
