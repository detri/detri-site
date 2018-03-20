import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home.jsx';
import Users from './components/Users.jsx';

const RouteContainer = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={Users} />
      </Switch>
    </div>
  );
};

export default RouteContainer;
