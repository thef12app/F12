import React, { useMemo, useState } from 'react';
import { utilList } from '../Utils/util-list';
import styles from './Popup.module.scss';

const Popup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const list = useMemo(
    () =>
      utilList
        .filter((u) => u.componentName)
        .filter(
          (u) => !searchTerm || u.name.toLowerCase().includes(searchTerm)
        ),
    [searchTerm]
  );
  const [selectedItem, setSelectedItem] = useState(null);

  const openApp = (file) => {
    chrome.tabs.create({
      url: `${file}.html`,
    });
  };

  const onSearchChange = (evt) => {
    setSearchTerm(evt.target.value);

    if (evt.key === 'Enter' && selectedItem < list.length) {
      openApp(list[selectedItem].path);
    } else if (evt.key === 'ArrowUp') {
      if (selectedItem == null) {
        setSelectedItem(list.length - 1);
      } else if (selectedItem > 0) {
        setSelectedItem(selectedItem - 1);
      }
    } else if (evt.key === 'ArrowDown') {
      if (selectedItem == null) {
        setSelectedItem(0);
      } else if (selectedItem < list.length - 1) {
        setSelectedItem(selectedItem + 1);
      }
    } else {
      setSelectedItem(0);
    }
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.menuTitle}>
        <div>
          F<span>12</span>
        </div>
        <div>The all in one Dev Toolbox</div>
      </div>
      <div className={styles.menuSearchContainer}>
        <input
          autoFocus
          placeholder="Search"
          className={styles.menuSearch}
          onKeyUp={onSearchChange}
        />
      </div>
      <div className={styles.menuList}>
        {list.map((util, i) => (
          <div
            className={
              styles.menuItem +
              ' ' +
              (selectedItem === i ? styles.selectedMenu : '')
            }
            onClick={() => openApp(util.path)}
          >
            {util.name}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <a
          href="https://thef12app.frill.co/b/n0o9qd06/feature-ideas"
          target="_blank"
        >
          Request for a feature
        </a>
      </div>
    </div>
  );
};

export default Popup;
