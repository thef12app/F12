import React, { useEffect, useMemo, useState } from 'react';

import { Input, Layout, Menu as AntMenu, Typography, Divider } from 'antd';
import styled from 'styled-components';
import { utilList } from '../../../pages/Utils/util-list';
import { useLocation } from 'react-router';
import style from './style.module.scss';
import { BulbOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons';
import { GradientButton } from '../../core/GradientButton';

const Menu = styled(AntMenu)`
  .ant-menu-item::after {
    content: none;
  }

  .ant-menu-item {
    display: flex;
    align-items: center;
  }

  &.ant-menu-inline-collapsed > .ant-menu-item .ant-menu-item-icon {
    line-height: 0;
  }

  .ant-menu-item-icon + span {
    margin-left: 16px;
  }

  .ant-menu-item:not(:last-child),
  .ant-menu-item {
    margin-top: 0;
    margin-bottom: 0;
    height: 50px;
    line-height: 50px;
  }

  .ant-menu-item:hover {
    background-color: #f5f5f5;
  }
`;

const { Sider } = Layout;
const SideMenu: React.FC<{
  isCollapsed: boolean;
  setCollapsed: (param: boolean) => void;
}> = ({ isCollapsed, setCollapsed }) => {
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

  return (
    <Sider
      collapsed={isCollapsed}
      width={'340px'}
      style={{
        borderRight: '3px solid #f0f2f5',
        paddingBottom: 154,
      }}
      theme="light"
    >
      <div className="logo" />
      <div style={{ width: '100%', padding: 10 }}>
        {!isCollapsed && (
          <Input
            onChange={(event: any) => {
              setTextSearch(event.target.value);
            }}
            placeholder="Search"
            type="search"
            style={{ padding: 10 }}
            allowClear
          ></Input>
        )}{' '}
        {isCollapsed && (
          <SearchOutlined
            onClick={() => setCollapsed(false)}
            style={{
              fontSize: '24px',
              padding: '10px',
              paddingLeft: '20px',
            }}
          />
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        style={{
          borderRight: 'none',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: 'calc(100% - 64px)',
        }}
      >
        {filteredMenu.map((li, index) => (
          <Menu.Item
            key={`/${li.path}`}
            icon={<li.icon style={{ fontSize: 24, color: '#03577B' }} />}
          >
            <Typography.Link href={`#/${li.path}`} style={{ fontSize: 18 }}>
              {<span>{li.name}</span>}
            </Typography.Link>
          </Menu.Item>
        ))}
      </Menu>
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
          <div style={{ marginBottom: 20 }}>
            <GradientButton
              icon={<StarOutlined />}
              gradient={'linear-gradient(to right, #005484, #B02091)'}
              href={
                'https://chrome.google.com/webstore/detail/f12/mbnakamgdofpbfjpibdmcmjonhoncbgf/reviews'
              }
              target="_blank"
              style={{ width: 254 }}
            >
              Rate us - 5 Stars
            </GradientButton>
          </div>
        )}
        {isCollapsed && (
          <div className={style.menuIcons}>
            <Typography.Link
              href={
                'https://chrome.google.com/webstore/detail/f12/mbnakamgdofpbfjpibdmcmjonhoncbgf/reviews'
              }
              target="_blank"
            >
              <StarOutlined />
            </Typography.Link>
          </div>
        )}
        {!isCollapsed && (
          // <div style={{ paddingBottom: '10px', paddingLeft: '10px' }}>
          //   <Button
          //     type="link"
          //     href="https://thef12app.frill.co/b/n0o9qd06/feature-ideas/idea/new"
          //     target="_blank"
          //     size={'large'}
          //     icon={<BulbOutlined style={{ fontSize: 24 }} />}
          //   >
          //     Submit an Idea
          //   </Button>
          // </div>
          <div style={{ marginBottom: 20 }}>
            <GradientButton
              href="https://thef12app.frill.co/b/n0o9qd06/feature-ideas/idea/new"
              target="_blank"
              gradient="linear-gradient(to right, #AB0000, #0085FF)"
              icon={<BulbOutlined />}
              style={{ width: 254 }}
            >
              Submit an Idea
            </GradientButton>
          </div>
        )}
        {isCollapsed && (
          <div className={style.menuIcons}>
            <Typography.Link
              href="https://thef12app.frill.co/b/n0o9qd06/feature-ideas/idea/new"
              target="_blank"
            >
              <BulbOutlined />
            </Typography.Link>
          </div>
        )}
      </div>
    </Sider>
  );
};

export default SideMenu;
