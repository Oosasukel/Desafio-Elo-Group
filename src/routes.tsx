import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteWrapper from './Middlewares/RouteWrapper';
import Leads from './pages/Leads';
import Login from './pages/Login';

function Routes() {
  return (
    <BrowserRouter>
      <RouteWrapper
        path='/'
        exact
        component={Leads}
        isPrivate
        redirectTo='/login'
      />
      <RouteWrapper path='/login' component={Login} />
    </BrowserRouter>
  );
}

export default Routes;
