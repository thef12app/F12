import React, { useCallback, useMemo, useState } from 'react';
import styles from './Layout.module.scss';
import { utilList as _utilList } from '../../pages/Utils/util-list';

import ratingIcon from '../../assets/img/ratings.png';
import { Input, Layout as AntDLayout, Menu, PageHeader } from 'antd';
import { Routes } from '../Routes/Routes';
import { HashRouter } from 'react-router-dom';

import 'antd/dist/antd.less';
import '../../../utils/override.css';
import SideMenu from './Sidemenu';

const utilList = _utilList.filter((u) => u.componentName);

const { Content, Footer } = AntDLayout;
export interface LayoutProps {
  actions?: React.ReactNode;
  title?: string;
}

export const App: React.FC<LayoutProps> = ({ children, actions, title }) => {
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
  }, []);
  const closeMenu = useCallback(() => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 300);
  }, []);

  return (
    <HashRouter>
      <AntDLayout>
        <PageHeader
          style={{ paddingTop: '8px', paddingBottom: '8px' }}
          className={styles.header}
          title={<div className={styles.title}>F12</div>}
          subTitle={title && <span className={styles.appTitle}>{title}</span>}
          extra={[
            <span className={styles.appTitle} key={'sub-title'}>
              The All in One Dev Toolbox
            </span>,
          ]}
        ></PageHeader>

        <AntDLayout>
          <SideMenu></SideMenu>
          <Content>
            <div
              className="site-layout-background"
              style={{ padding: '0px 5px', minHeight: 360 }}
            >
              <div className={styles.container}>
                <Routes></Routes>
              </div>
            </div>
          </Content>
        </AntDLayout>
      </AntDLayout>
    </HashRouter>
  );
};
