import { BulbOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useMemo, useState } from 'react';
import { utilList } from '../Utils/util-list';
import styles from './Popup.module.scss';

const Popup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const list = useMemo(
    () =>
      utilList.filter(
        (u) => !searchTerm || u.name.toLowerCase().includes(searchTerm)
      ),
    [searchTerm]
  );
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openApp = (route: string) => {
    chrome.tabs.create({
      url: `index.html/#/${route}`,
    });
  };

  const onSearchChange: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    setSearchTerm((evt.target as any).value);

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
        <div>F12</div>
        <div className={styles.subTitle}>The all in one Dev Toolbox</div>
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
        {list.map((util: any, i: number) => (
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
        <Button
          type="link"
          href="https://thef12app.frill.co/b/n0o9qd06/feature-ideas/idea/new"
          target="_blank"
          size={'large'}
          icon={<BulbOutlined style={{ fontSize: 24 }} />}
          style={{ color: 'black' }}
        >
          Submit an Idea
        </Button>
      </div>
    </div>
  );
};

export default Popup;
