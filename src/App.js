import React from 'react';

import AppRouter from './routes/app-router';

function App() {
  console.log(process.env);
  return (
    <AppRouter />
  );
}

export default App;
