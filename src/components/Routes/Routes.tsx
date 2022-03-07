import React, { lazy } from 'react';

import { Route, Switch } from 'react-router-dom';

const KeyCodeFinder = lazy(() =>
  import('../KeyCodeFinder').then((module) => ({
    default: module.KeyCodeFinder,
  }))
);
const Formatter = lazy(() =>
  import('../Formatter/Formatter').then((module) => ({
    default: module.Formatter,
  }))
);
const UriInspector = lazy(() =>
  import('../UriInspector/UriInspector').then((module) => ({
    default: module.UriInspector,
  }))
);
const Base64 = lazy(() =>
  import('../base64/Base64').then((module) => ({
    default: module.Base64,
  }))
);
const JwtEncoderDecoder = lazy(() =>
  import('../JwtEncoderDecoder/JwtEncoderDecoder').then((module) => ({
    default: module.JwtEncoderDecoder,
  }))
);
const ImageToDataURI = lazy(() =>
  import('../ImageToDataURI/ImageToDataURI').then((module) => ({
    default: module.ImageToDataURI,
  }))
);
const UnixTimeConverter = lazy(() =>
  import('../UnixTimeConverter/UnixTimeConverter').then((module) => ({
    default: module.UnixTimeConverter,
  }))
);
const DiffEditor = lazy(() =>
  import('../DiffEditor/DiffEditor').then((module) => ({
    default: module.DiffEditor,
  }))
);

const RegExp = lazy(() =>
  import('../RegExp').then((module) => ({
    default: module.RegExpressionComponent,
  }))
);
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
      <Route path="/RegExp" component={RegExp} />
      <Route path="/test" component={test} />
      <Route render={() => <div>Coming soon...</div>} />
    </Switch>
  );
};
