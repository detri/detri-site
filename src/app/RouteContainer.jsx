import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home.jsx';
import Users from './components/Users.jsx';
import Songs from './components/Songs.jsx';
import Upload from './components/Upload.jsx';

const RouteContainer = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={Users} />
        <Route path='/songs' component={Songs} />
        <Route path='/upload' component={Upload} />
      </Switch>
    </div>
  );
};

export default RouteContainer;
