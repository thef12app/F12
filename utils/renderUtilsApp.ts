import React from 'react';
import ReactDom from 'react-dom';

export const render = (Component) => {
  ReactDom.render(<Component />, document.getElementById('app-container'));
};
