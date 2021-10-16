import React, { useEffect, useMemo, useState } from 'react';

import { Input, Layout, Menu, Typography, Divider, Button } from 'antd';
import { utilList } from '../../../pages/Utils/util-list';
import { useLocation } from 'react-router';
import style from './style.module.scss';

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
        <Input
          onChange={(event: any) => {
            setTextSearch(event.target.value);
          }}
          placeholder="Search"
          type="search"
          style={{ padding: 10 }}
          allowClear
        ></Input>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        {filteredMenu.map((li, index) => (
          <Menu.Item key={`/${li.path}`}>
            <Typography.Link href={`#/${li.path}`} style={{ fontSize: 18 }}>
              {<li.icon style={{ fontSize: 18 }} />}
              {!collapsed && <span>{li.name}</span>}
            </Typography.Link>
          </Menu.Item>
        ))}
        <div className={style.menuBottomOptions}>
          <Divider />
          <div style={{ paddingLeft: 24 }}>
            <Button size={'large'}>Rate us - 5 Stars</Button>
          </div>
          <div style={{ paddingLeft: 24 }}>
            <Button size={'large'}>Submit an Idea</Button>
          </div>
        </div>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
