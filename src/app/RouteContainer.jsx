import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from './components/Content.jsx';
import Section from './components/Section.jsx';
import Home from './components/Home.jsx';

const RouteContainer = () => {
  return (
    <Section>
      <Content>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Content>
    </Section>
  );
};

export default RouteContainer;
