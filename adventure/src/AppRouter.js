import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Register from './Components/Register';
import Login from './Components/Login';
import World from './Components/World';

function AppRouter() {
  return (
    <div>
      <Switch>
        <Route path='/register' component={Register} />
        <Route exact path='/' component={Login} />
        <Route path='/world' component={World} />
      </Switch>
    </div>
  );
}

export default AppRouter;
