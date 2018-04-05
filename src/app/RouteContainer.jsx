import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Content from './components/Content.jsx';
import Section from './components/Section.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';

const RouteContainer = () => {
  return (
    <Section>
      <Content>
        <Route render={({ location }) => {
          return (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames='router' unmountOnExit timeout={null}>
                <Switch location={location}>
                  <Route exact path='/' component={Home} />
                  <Route path='/register' component={Register} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          );
        }} />
      </Content>
    </Section>
  );
};

export default RouteContainer;
