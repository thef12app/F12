import React, { useEffect, useState } from 'react';

import { MemoryRouter } from 'react-router-dom';
import { random } from 'lodash';
import cn from 'classnames';
import images from '../../../utils/pexels/image-cache.json';

import { Utils } from '../Utils/Utils';
import './Newtab.scss';

import CloseIcon from '../../assets/icons/close.svg';
import ArrowIcon from '../../assets/icons/arrow.svg';

// this has to be set based on the screen resolution
const src = images[random(0, images.length - 1)].src.large2x;
const Newtab = () => {
  const [showUtils, setShowUtils] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const openUtils = () => setShowUtils(true);
  const closeUtils = () => setShowUtils(false);

  useEffect(() => {
    var image = new Image();
    image.addEventListener('load', function () {
      console.log('loaded');
      setLoaded(true);
    });
    image.src = src;
  }, [setLoaded]);

  return (
    <MemoryRouter>
      <div
        className="app"
        style={{ backgroundImage: `url(${src})`, opacity: loaded ? 1 : 0 }}
      >
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
