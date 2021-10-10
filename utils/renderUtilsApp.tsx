import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.less';
import './override.css';

export const render = (Component: any) => {
  ReactDom.render(<Component />, document.getElementById('app-container'));
};
