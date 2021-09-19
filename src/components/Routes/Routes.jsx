import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { JsonFormat } from '../JsonFormat/JsonFormat';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/json-formatter" component={JsonFormat} />
      <Route render={() => <div>Coming soon...</div>} />
    </Switch>
  );
};
