import React, { useState } from 'react';

import cn from 'classnames';

import { Utils } from '../Utils/Utils';
import './Newtab.scss';

import CloseIcon from '../../assets/icons/close.svg';
import ArrowIcon from '../../assets/icons/arrow.svg';

const Newtab = () => {
  const [showUtils, setShowUtils] = useState(false);

  const openUtils = () => setShowUtils(true);
  const closeUtils = () => setShowUtils(false);

  return (
    <div className="app">
      {showUtils && (
        <div className="utils-wrapper">
          <button className="close-btn" onClick={closeUtils}>
            <CloseIcon />
          </button>
          <Utils />
        </div>
      )}
      <button
        className={cn('utils-btn', {
          'utils-app-open': showUtils,
        })}
        title={showUtils ? 'Close utilities' : 'Utilities'}
        onClick={openUtils}
      >
        <ArrowIcon />
      </button>
    </div>
  );
};

export default Newtab;
