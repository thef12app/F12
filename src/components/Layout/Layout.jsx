import React, { useState } from 'react';
import styles from './Layout.module.scss';
import { utilList } from '../../pages/Utils/util-list';
import arrowIcon from '../../assets/icons/arrow.png';

export const Layout = ({ children, actions }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = () => setMenuOpen(!menuOpen);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          F12
          <span className={styles.dropdownArrow} onClick={toggle}>
            <img src={arrowIcon} />
          </span>
          {menuOpen && (
            <div className={styles.menu}>
              {utilList
                .filter((u) => u.componentName)
                .map((u) => (
                  <a href={`${u.path}.html`}>{u.name}</a>
                ))}
            </div>
          )}
        </div>
        <div>{actions}</div>
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <a href="https://www.buymeacoffee.com/thef12app" target="_blank">
          <img src="https://img.buymeacoffee.com/button-api/?text=Buy us a coffee&emoji=&slug=thef12app&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
        </a>
      </div>
    </div>
  );
};
