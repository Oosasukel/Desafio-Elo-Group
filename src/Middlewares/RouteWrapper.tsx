import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import AuthContext from '../Contexts/authContext';

function RouteWrapper({
  redirectTo = '/login',
  isPrivate = false,
  component: Component,
  ...rest
}: {
  redirectTo?: string;
  isPrivate?: boolean;
  component: React.FC<any>;
} & RouteProps) {
  const [token] = useContext(AuthContext);
  const authenticated = token;

  if (!authenticated && isPrivate) return <Redirect to={redirectTo} />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default RouteWrapper;
