import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';

import { Route, Redirect, Switch } from 'react-router-dom';

import { store, history } from './store';
import Home from './components/home.jsx';
import Kanban from './components/kanban.jsx';
import Backlog from './components/backlog.jsx';

import 'semantic-ui-css/semantic.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={ history }>
        <Switch>
          <Redirect exact from="/" to="/backlog" />
          <Route exact path="/" component={Home}/>
          <Route path="/backlog" component={Backlog}/>
          <Route path="/kanban/:sprintId" component={Kanban}/>
        </Switch>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('react-content')
  );
});
