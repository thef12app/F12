import React, { useEffect, useMemo, useState } from 'react';

import { Input, Layout, Menu, Typography, Divider, Button } from 'antd';
import { utilList } from '../../../pages/Utils/util-list';
import { useLocation } from 'react-router';
import style from './style.module.scss';
import { BulbOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const SideMenu: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const [searchText, setTextSearch] = useState('');
  const [collapsed, setCollapsed] = useState(false);
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
      collapsed={collapsed}
      width={'340px'}
      style={{
        borderRight: '3px solid #f0f2f5',
      }}
      theme="light"
    >
      <div className="logo" />
      <div style={{ width: '100%', padding: 10 }}>
        {!collapsed && (
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
        {collapsed && (
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
        style={{ borderRight: 'none' }}
      >
        {filteredMenu.map((li, index) => (
          <Menu.Item
            key={`/${li.path}`}
            icon={<li.icon style={{ fontSize: 24 }} />}
          >
            <Typography.Link href={`#/${li.path}`} style={{ fontSize: 18 }}>
              {<span>{li.name}</span>}
            </Typography.Link>
          </Menu.Item>
        ))}
      </Menu>
      <div className={style.menuBottomOptions}>
        <Divider />
        {!collapsed && (
          <div style={{ paddingBottom: '10px', paddingLeft: '10px' }}>
            <Button
              type="link"
              size={'large'}
              icon={<StarOutlined style={{ fontSize: 24 }} />}
              href={
                'https://chrome.google.com/webstore/detail/f12/mbnakamgdofpbfjpibdmcmjonhoncbgf/reviews'
              }
              target="_blank"
            >
              Rate us - 5 Stars
            </Button>
          </div>
        )}
        {collapsed && (
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
        {!collapsed && (
          <div style={{ paddingBottom: '10px', paddingLeft: '10px' }}>
            <Button
              type="link"
              href="https://thef12app.frill.co/b/n0o9qd06/feature-ideas/idea/new"
              target="_blank"
              size={'large'}
              icon={<BulbOutlined style={{ fontSize: 24 }} />}
            >
              Submit an Idea
            </Button>
          </div>
        )}
        {collapsed && (
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
