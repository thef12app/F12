import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

render(<Popup />, window.document.querySelector('#app-container'));


if ((module as any).hot) (module as any).hot.accept();
