import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Layout.module.scss';
import { utilList as _utilList } from '../../pages/Utils/util-list';

import ratingIcon from '../../assets/img/ratings.png';

const utilList = _utilList.filter((u) => u.componentName);

export const Layout = ({ children, actions, title }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setTextSearch] = useState('');

  const filteredMenu = useMemo(() => {
    return searchText
      ? utilList.filter((u) =>
          u.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : utilList;
  }, [searchText]);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  });
  const closeMenu = useCallback(() => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 300);
  });

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          F12 {title && <span className={styles.appTitle}>{title}</span>}
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.search}
            onFocus={openMenu}
            onBlur={closeMenu}
            onChange={(e) => setTextSearch(e.target.value)}
          />
          {menuOpen && (
            <div className={styles.menu}>
              {filteredMenu.map((u) => (
                <a href={`${u.path}.html`} key={u.path}>
                  {u.name}
                </a>
              ))}
            </div>
          )}
        </div>
        <div>{actions}</div>
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <a
          href="https://chrome.google.com/webstore/detail/f12/mbnakamgdofpbfjpibdmcmjonhoncbgf/reviews"
          target="_blank"
          className={styles.footerLink}
        >
          Please rate us here
          <img
            src={ratingIcon}
            alt="Rating Icon"
            className={styles.ratingImage}
          />
        </a>
        <a href="https://www.buymeacoffee.com/thef12app" target="_blank">
          <img src="https://img.buymeacoffee.com/button-api/?text=Buy us a coffee&emoji=&slug=thef12app&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
        </a>
        <a
          href="https://thef12app.frill.co/b/n0o9qd06/feature-ideas"
          target="_blank"
          className={styles.footerLink}
        >
          Request for a feature
        </a>
      </div>
    </div>
  );
};
