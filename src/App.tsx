import React, { useState } from 'react';
import authContext from './Contexts/authContext';
import Routes from './routes';

import './styles/global.css';

function App() {
  const [token, setToken] = useState('');

  return (
    <authContext.Provider value={[token, setToken]}>
      <Routes />
    </authContext.Provider>
  );
}

export default App;
