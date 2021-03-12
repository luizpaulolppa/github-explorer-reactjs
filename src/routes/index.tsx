import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import User from '../pages/User';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/:username" component={User} exact />
  </Switch>
);

export default Routes;
