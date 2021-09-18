import React from 'react';
import { useHistory } from 'react-router';
import { Routes } from '../../components/Routes/Routes';
import { utilList } from './util-list';
import cn from 'classnames';

import './utils.scss';
import { useState } from 'react';

export const Utils = () => {
  const [currentlyOpen, setCurrentlyOpen] = useState();
  const history = useHistory();

  const openApp = (key) => {
    console.log('clicked', key, history.location.pathname);
    history.push(key);
    setCurrentlyOpen(key);
  };
  return (
    <div className="utils-page">
      <div className="sidebar">
        <div className="search-wrapper">
          <input type="text" className="search" autoFocus />
        </div>
        <div className="util-list">
          {utilList.map((u) => (
            <div
              className={cn('util-list-item', {
                selected: u.path === currentlyOpen,
              })}
              key={u.name}
              onClick={() => openApp(u.path)}
            >
              {u.name}
            </div>
          ))}
        </div>
      </div>
      <div className="util-main">
        <Routes />
      </div>
    </div>
  );
};
