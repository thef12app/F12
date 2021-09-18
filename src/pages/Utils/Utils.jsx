import React, { useMemo } from 'react';
import { useHistory } from 'react-router';
import { Routes } from '../../components/Routes/Routes';
import { utilList } from './util-list';
import cn from 'classnames';

import './utils.scss';
import { useState } from 'react';

export const Utils = () => {
  const [currentlyOpen, setCurrentlyOpen] = useState();
  const [searchText, setSearchText] = useState('');
  const filteredUtils = useMemo(
    () =>
      utilList.filter(
        (u) =>
          !searchText ||
          u.name.toLowerCase().search(searchText.toLowerCase()) !== -1
      ),
    [searchText]
  );

  const history = useHistory();

  const openApp = (key) => {
    history.push(key);
    setCurrentlyOpen(key);
  };
  return (
    <div className="utils-page">
      <div className="sidebar">
        <div className="search-wrapper">
          <input
            type="text"
            className="search"
            placeholder="Search Tools"
            onChange={(evt) => setSearchText(evt.target.value)}
            autoFocus
          />
        </div>
        <div className="util-list">
          {filteredUtils.map((u) => (
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
