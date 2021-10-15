import React from 'react';

import { Input, Layout, Menu, Typography } from 'antd';
import { utilList } from '../../../pages/Utils/util-list';
import { useLocation } from 'react-router';

const { Sider } = Layout;
const SideMenu = () => {
  const location = useLocation();

  return (
    <Sider width={'340px'}>
      <div className="logo" />
      <div style={{ width: '100%', padding: 10 }}>
        <Input
          placeholder="Search"
          type="search"
          style={{ padding: 10 }}
          allowClear
        ></Input>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        {utilList.map((li, index) => (
          <Menu.Item key={`/${li.path}`}>
            <Typography.Link href={`#/${li.path}`}>{li.name}</Typography.Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
