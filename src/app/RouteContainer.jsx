import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from './components/Content.jsx';
import Section from './components/Section.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Upload from './components/Upload.jsx';
import Songs from './components/Songs.jsx';

const RouteContainer = () => {
  return (
    <Section>
      <Content>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/upload' component={Upload} />
          <Route path='/songs' component={Songs} />
          <Route render={() => { return <div>Not found.</div>; }} />
        </Switch>
      </Content>
    </Section>
  );
};

export default RouteContainer;
