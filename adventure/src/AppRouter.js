import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Register from './Components/Register';
import Login from './Components/Login';

function AppRouter() {
    return <div>
        <Switch>
            <Route path = '/register' component = {Register} />
            <Route path = '/' component = {Login} />
        </Switch>
    </div>
}

export default AppRouter