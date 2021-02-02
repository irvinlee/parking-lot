import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import * as Pages from './pages';

export default function Routes({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" children={<Pages.Homepage />} />
        <Route path="/dashboard/:slotCount" children={<Pages.Dashboard />} />
      </Switch>
    </Router>
  );
}

Routes.defaultProps = {
  history: createBrowserHistory(),
};
