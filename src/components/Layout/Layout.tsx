import React, { Suspense, useState } from 'react';
import styles from './Layout.module.scss';

import { Layout as AntDLayout, PageHeader } from 'antd';
import { Routes } from '../Routes/Routes';
import { HashRouter } from 'react-router-dom';

import 'antd/dist/antd.less';
import '../../../utils/override.css';
import SideMenu from './Sidemenu';
import { LoadingOutlined, MenuOutlined } from '@ant-design/icons';

const { Content } = AntDLayout;
export interface LayoutProps {
  actions?: React.ReactNode;
  title?: string;
}

export const App: React.FC<LayoutProps> = ({ title }) => {
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(false);

  return (
    <HashRouter>
      <AntDLayout>
        <PageHeader
          style={{ paddingTop: '8px', paddingBottom: '8px' }}
          className={styles.header}
          title={
            <div className={styles.title}>
              {' '}
              <MenuOutlined
                onClick={() => setSideMenuCollapsed(!sideMenuCollapsed)}
              />{' '}
              F12
            </div>
          }
          subTitle={title && <span className={styles.appTitle}>{title}</span>}
          extra={[
            <span className={styles.appTitle} key={'sub-title'}>
              The All in One Dev Toolbox
            </span>,
          ]}
        ></PageHeader>

        <AntDLayout>
          <SideMenu isCollapsed={sideMenuCollapsed}></SideMenu>
          <Content>
            <div
              className="site-layout-background"
              style={{ padding: '2px 5px', minHeight: 360 }}
            >
              <div className={styles.container}>
                <Suspense
                  fallback={
                    <div>
                      <LoadingOutlined />
                    </div>
                  }
                >
                  <Routes></Routes>
                </Suspense>
              </div>
            </div>
          </Content>
        </AntDLayout>
      </AntDLayout>
    </HashRouter>
  );
};
