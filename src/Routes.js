import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import * as Pages from './pages';

export default function Routes({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" children={<Pages.Homepage />} />
        <Route path="/dashboard/:slotCount" children={<Pages.Dashboard />} />
        <Route path="/404" children={<Pages.NotFound />} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  );
}

Routes.defaultProps = {
  history: createBrowserHistory(),
};
