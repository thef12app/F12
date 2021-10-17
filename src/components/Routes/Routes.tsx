import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Formatter } from '../Formatter/Formatter';
import { KeyCodeFinder } from '../KeyCodeFinder';
import { UriInspector } from '../UriInspector/UriInspector';
import { JwtEncoderDecoder } from '../JwtEncoderDecoder/JwtEncoderDecoder';
import { Base64 } from '../base64/Base64';
import { ImageToDataURI } from '../ImageToDataURI/ImageToDataURI';
import { UnixTimeConverter } from '../UnixTimeConverter/UnixTimeConverter';
import { DiffEditor } from '../DiffEditor/DiffEditor';
// import { ImageOptimizer } from '../ImageOptimizer/ImageOptimizer';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/formatter" component={Formatter} />
      <Route path="/keycode-finder" component={KeyCodeFinder} />
      <Route path="/url-inspector" component={UriInspector} />
      <Route path="/base64" component={Base64} />
      <Route path="/jwt-decoder" component={JwtEncoderDecoder} />
      <Route path="/image2DataUri" component={ImageToDataURI} />
      <Route path="/unix-time-converter" component={UnixTimeConverter} />
      <Route path="/DiffTool" component={DiffEditor} />
      {/* <Route path="/imageOptimizer" component={ImageOptimizer} /> */}
      <Route render={() => <div>Coming soon...</div>} />
    </Switch>
  );
};
