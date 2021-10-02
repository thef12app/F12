import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { JsonFormat } from '../JsonFormat/JsonFormat';
import { KeyCodeFinder } from '../KeyCodeFinder';
import { UriInspector } from '../UriInspector/UriInspector';
import { JwtEncoderDecoder } from '../JwtEncoderDecoder/JwtEncoderDecoder';
import { Base64 } from '../base64/Base64';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/json-formatter" component={JsonFormat} />
      <Route path="/keycode-finder" component={KeyCodeFinder} />
      <Route path="/url-inspector" component={UriInspector} />
      <Route path="/base64" component={Base64} />
      <Route path="/jwt-decoder" component={JwtEncoderDecoder} />
      <Route render={() => <div>Coming soon...</div>} />
    </Switch>
  );
};
