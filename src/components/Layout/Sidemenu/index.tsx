import React from 'react';

import { Input, Layout, Menu, Typography } from 'antd';
import { utilList } from '../../../pages/Utils/util-list';
import { useHistory } from 'react-router';

import style from '../Layout.module.scss';

const { Sider } = Layout;
const SideMenu = () => {
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
