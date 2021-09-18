import React, { useState } from 'react';

import { MemoryRouter } from 'react-router-dom';
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
    <MemoryRouter>
      <div className="app">
        {showUtils && (
          <>
            <button className="close-btn" onClick={closeUtils}>
              <CloseIcon />
            </button>
            <div className="utils-wrapper">
              <Utils />
            </div>
          </>
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
    </MemoryRouter>
  );
};

export default Newtab;
