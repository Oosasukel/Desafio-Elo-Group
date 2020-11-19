import React from 'react';

const AuthContext = React.createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(['', () => {}]);

export default AuthContext;
