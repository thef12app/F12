import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { JsonFormat } from '../JsonFormat/JsonFormat';
import { KeyCodeFinder } from '../KeyCodeFinder';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/json-formatter" component={JsonFormat} />
      <Route path="/keycode-finder" component={KeyCodeFinder} />
      <Route render={() => <div>Coming soon...</div>} />
    </Switch>
  );
};
