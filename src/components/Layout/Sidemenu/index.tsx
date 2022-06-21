import React, { useEffect, useMemo, useState } from 'react';

import { utilList } from '../../../pages/Utils/util-list';
import { useLocation } from 'react-router';
import style from './style.module.scss';
import {
  styled,
  Button,
  Container,
  Grid,
  Image,
  Input,
  theme,
  Tooltip,
  Divider,
} from '@nextui-org/react';
import { useHistory } from 'react-router-dom';
import { VscLightbulb, VscSearch, VscStarFull } from 'react-icons/vsc';

const SideMenu: React.FC<{
  isCollapsed: boolean;
  setCollapsed: (param: boolean) => void;
}> = ({ isCollapsed, setCollapsed }) => {
  const history = useHistory();
  const [searchText, setTextSearch] = useState('');
  const location = useLocation();

  const filteredMenu = useMemo(() => {
    return searchText
      ? utilList.filter((u) =>
          u.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : utilList;
  }, [searchText]);

  useEffect(() => {
    if (isCollapsed) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isCollapsed]);

  const MenuContainer = styled('button', {
    cursor: 'pointer',
    backgroundColor: theme.colors.accents4.value,
    borderRadius: theme.radii.md.value,
    borderColor: theme.colors.accents0.value,
    borderWidth: theme.radii.md.value,
    borderStyle: 'solid',
    height: '50',
    width: '50',
    fontSize: theme.fontSizes.lg.value,
    '&:hover': {
      backgroundColor: theme.colors.accents8.value,
    },
    padding: 10,
    borderWidth: theme.borderWeights.light.value,
  });

  return (
    <Container
      style={{
        borderRightColor: theme.colors.accents5.value,
        borderRightStyle: 'solid',
        overflow: 'hidden',
        paddingBottom: 154,
        width: isCollapsed ? '60px' : '260px',
        height: '100%',
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <div className="logo" />
      <div style={{ width: '100%', padding: 10 }}>
        {!isCollapsed && (
          <Input
            animated={false}
            bordered
            onChange={(event: any) => {
              setTextSearch(event.target.value);
            }}
            placeholder="Search"
            type="search"
            style={{ padding: 8 }}
            css={{
              w: '100%',
            }}
            shadow={false}
          ></Input>
        )}{' '}
      </div>
      <Container
        style={{
          borderRight: 'none',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: 'calc(100% - 64px)',
          width: '100%',
          padding: 0,
        }}
      >
        <Grid.Container
          gap={1}
          direction="column"
          css={{
            w: isCollapsed ? '60px' : '100%',
          }}
        >
          {isCollapsed && (
            <Grid justify="center">
              <MenuContainer
                style={{
                  width: !isCollapsed ? '100%' : 'auto',
                }}
              >
                <VscSearch
                  onClick={() => setCollapsed(false)}
                  color={theme.colors.primary.value}
                  style={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    fontWeight: 800,
                    backgroundImage: theme.colors.gradient.value,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: theme.colors.primary.value,
                  }}
                />
              </MenuContainer>
            </Grid>
          )}
          {filteredMenu.map((li, index) => (
            <Grid justify="center">
              {isCollapsed && (
                <MenuContainer
                  style={{
                    width: !isCollapsed ? '100%' : 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor:
                      li.path !== location.pathname.split('/')[1]
                        ? theme.colors.accents0.value
                        : theme.colors.accents0.value,
                    backgroundColor:
                      li.path !== location.pathname.split('/')[1]
                        ? theme.colors.accents0.value
                        : theme.colors.accents3.value,
                  }}
                  key={`/${li.path}`}
                  onClick={() => {
                    history.push(`/${li.path}`);
                  }}
                >
                  <Tooltip content={li.name} placement="right">
                    <li.icon
                      style={{
                        cursor: 'pointer',
                        fontSize: '24px',
                        fontWeight: 800,
                        backgroundImage: theme.colors.gradient.value,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color:
                          li.path !== location.pathname.split('/')[1]
                            ? theme.colors.primary.value
                            : theme.colors.text.value,
                      }}
                    />{' '}
                  </Tooltip>
                  {/* {isCollapsed && } */}
                </MenuContainer>
              )}
              {!isCollapsed && (
                <Button
                  auto
                  ripple={false}
                  bordered={li.path !== location.pathname.split('/')[1]}
                  onClick={() => {
                    history.push(`/${li.path}`);
                  }}
                  css={{
                    w: '100%',
                  }}
                  color={
                    li.path === location.pathname.split('/')[1]
                      ? 'gradient'
                      : 'default'
                  }
                >
                  <span>{li.name}</span>
                </Button>
              )}
            </Grid>
          ))}
        </Grid.Container>
        <div className={style.menuBottomOptions}>
          <Divider style={{ marginTop: 8, marginBottom: 20 }} />
          {!isCollapsed && (
            // <div style={{ paddingBottom: '10px', paddingLeft: '10px' }}>
            //   <Button
            //     type="link"
            //     size={'large'}
            //     icon={<StarOutlined style={{ fontSize: 24 }} />}
            //     href={
            //       'https://chrome.google.com/webstore/detail/f12/mbnakamgdofpbfjpibdmcmjonhoncbgf/reviews'
            //     }
            //     target="_blank"
            //   >
            //     Rate us - 5 Stars
            //   </Button>
            // </div>
            <Grid.Container direction="column" gap={1}>
              <Grid>
                <div style={{ marginBottom: 20 }}>
                  <Button
                    icon={<VscStarFull />}
                    color={'gradient'}
                    href={
                      'https://chrome.google.com/webstore/detail/f12/mbnakamgdofpbfjpibdmcmjonhoncbgf/reviews'
                    }
                    target="_blank"
                    style={{ width: 254 }}
                  >
                    Rate us - 5 Stars
                  </Button>
                </div>
              </Grid>
              <Grid>
                <Button
                  href="https://thef12app.frill.co/b/n0o9qd06/feature-ideas/idea/new"
                  target="_blank"
                  color={'gradient'}
                  icon={<VscLightbulb />}
                  style={{ width: 254 }}
                >
                  Submit an Idea
                </Button>
              </Grid>
            </Grid.Container>
          )}
          {isCollapsed && (
            <Grid.Container direction="column" gap={1}>
              <Grid>
                <div className={style.menuIcons}>
                  <Button
                    ghost
                    href={
                      'https://chrome.google.com/webstore/detail/f12/mbnakamgdofpbfjpibdmcmjonhoncbgf/reviews'
                    }
                    target="_blank"
                  >
                    <VscStarFull />
                  </Button>
                </div>
              </Grid>
              <Grid>
                <div className={style.menuIcons}>
                  <Button
                    ghost
                    href="https://thef12app.frill.co/b/n0o9qd06/feature-ideas/idea/new"
                    target="_blank"
                  >
                    <VscLightbulb />
                  </Button>
                </div>
              </Grid>
            </Grid.Container>
          )}
        </div>
      </Container>
    </Container>
  );
};

export default SideMenu;
