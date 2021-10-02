import React from 'react';
import styles from './Layout.module.scss';

export const Layout = ({ children, actions }) => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>F12</div>
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
