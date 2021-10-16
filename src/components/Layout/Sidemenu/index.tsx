import React, { useMemo, useState } from 'react';

import { Input, Layout, Menu, Typography } from 'antd';
import { utilList } from '../../../pages/Utils/util-list';
import { useLocation } from 'react-router';

const { Sider } = Layout;
const SideMenu = () => {
  const [searchText, setTextSearch] = useState('');
  const location = useLocation();

  const filteredMenu = useMemo(() => {
    return searchText
      ? utilList.filter((u) =>
          u.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : utilList;
  }, [searchText]);

  return (
    <Sider
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
              {<li.icon style={{ fontSize: 18 }} />} {li.name}
            </Typography.Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
