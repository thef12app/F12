import React from 'react';

import { Layout, Menu, Typography } from 'antd';
import { utilList } from '../../../pages/Utils/util-list';
import { useHistory } from 'react-router';

const { Sider } = Layout;
const SideMenu = () => {
  return (
    <Sider>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        {utilList.map((li, index) => (
          <Menu.Item key={index}>
            <Typography.Link href={`#/${li.path}`}>{li.name}</Typography.Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
