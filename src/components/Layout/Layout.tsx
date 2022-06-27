import React, { Suspense, useState } from 'react';
import styles from './Layout.module.scss';

import { Routes } from '../Routes/Routes';
import { HashRouter } from 'react-router-dom';

import '../../../utils/override.css';
import SideMenu from './Sidemenu';
import { LoadingOutlined } from '@ant-design/icons';

import { Container, createTheme, Grid, Switch, theme } from '@nextui-org/react';
import { NextUIProvider } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { VscMenu } from 'react-icons/vsc';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export interface LayoutProps {
  actions?: React.ReactNode;
  title?: string;
}

export const App: React.FC<LayoutProps> = ({ title }) => {
  const lightTheme = createTheme({
    type: 'light',
    theme: {
      colors: {
        primaryBorder: '#444',
      },
      borderWeights: {
        light: '1px',
        normal: '1px',
        bold: '1px',
        extrabold: '1px',
        black: '1px',
      },
    },
  });

  const darkTheme = createTheme({
    type: 'dark',
    theme: {},
  });

  // 3. Apply light or dark theme depending on useDarkMode value
  // App.jsx entry point of your app

  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(true);
  const darkMode = useDarkMode(true);

  return (
    <HashRouter>
      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <Container
          fluid
          style={{
            maxWidth: '100vw',
            margin: 0,
            padding: 0,
            background: theme.colors.accents0.value,
          }}
        >
          <div
            style={{
              paddingTop: '8px',
              paddingBottom: '8px',
              borderBottomColor: theme.colors.accents5.value,
              width: '100%',
              backgroundColor: theme.colors.accents0.value,
            }}
            className={styles.header}
            // subTitle={
            //   title && <span className={styles.appTitle}>{title}</span>
            // }
          >
            <div className={styles.title} style={{ width: '100%' }}>
              <VscMenu
                style={{
                  cursor: 'pointer',
                  color: theme.colors.primary.value,
                }}
                onClick={() => setSideMenuCollapsed(!sideMenuCollapsed)}
              />
              <span
                style={{
                  color: theme.colors.primary.value,
                  fontWeight: 600,
                  padding: theme.space[1].value,
                }}
              >
                F12
                <span className={styles.tagLine} key={'sub-title'}>
                  The All in One Dev Toolbox
                </span>
              </span>
            </div>
            <span>
              <Switch
                onChange={(event) => {
                  darkMode.toggle();
                }}
                checked={false}
                size="xl"
                iconOff={<IoMdSunny />}
                iconOn={<IoMdMoon />}
              />
            </span>
          </div>

          <Container fluid style={{ maxWidth: '100vw', margin: 0, padding: 0 }}>
            <Grid.Container justify="flex-start">
              <Grid
                css={{
                  w: sideMenuCollapsed ? '60px' : '260px',
                }}
              >
                <SideMenu
                  isCollapsed={sideMenuCollapsed}
                  setCollapsed={setSideMenuCollapsed}
                ></SideMenu>
              </Grid>
              <Grid xs>
                <div
                  className="site-layout-background"
                  style={{
                    padding: '2px 5px',
                    minHeight: 360,
                    width: '100%',
                  }}
                >
                  <div
                    className={styles.container}
                    style={{
                      padding: '10px 10px',
                    }}
                  >
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
              </Grid>
            </Grid.Container>
          </Container>
        </Container>
      </NextUIProvider>
    </HashRouter>
  );
};
