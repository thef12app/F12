import React from 'react';
import { utilList } from './util-list';

import './utils.scss';

export const Utils = () => {
  return (
    <div className="utils-page">
      <div className="sidebar">
        <div className="search-wrapper">
          <input type="text" className="search" autoFocus />
        </div>
        <div className="util-list">
          {utilList.map((u) => (
            <div className="util-list-item" key={u.name}>
              {u.name}
            </div>
          ))}
        </div>
      </div>
      <div className="util-main">Here will be the memory router</div>
    </div>
  );
};
