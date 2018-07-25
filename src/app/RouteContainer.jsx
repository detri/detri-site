import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from './components/Styling/Content.jsx';
import Section from './components/Styling/Section.jsx';
import Home from './components/Routes/Home.jsx';
import Register from './components/Routes/Register.jsx';
import Upload from './components/Routes/Upload.jsx';
import Songs from './components/Routes/Songs.jsx';
import Users from './components/Routes/Users.jsx';
import User from './components/Routes/User.jsx';

const RouteContainer = () => {
  return (
    <Section>
      <Content>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/upload' component={Upload} />
          <Route path='/songs' component={Songs} />
          <Route path='/users/:username' component={User} />
          <Route path='/users' component={Users} />
          <Route render={() => { return <div>Not found.</div>; }} />
        </Switch>
      </Content>
    </Section>
  );
};

export default RouteContainer;
