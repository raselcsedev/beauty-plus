
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import './NavBar.css';

const { Header } = Layout;

const NavBar: React.FC = () => {
  return (
    <Header className="header">
      <div className="logo">
        {/* <img src="/logo.png" alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} /> */}
        <span style={{ color: 'white', fontSize: '1.5rem' }}>Beauty Plus</span>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '45px', marginTop: "10px" }}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UnorderedListOutlined />}>
          <Link to="/products">Products</Link>
        </Menu.Item>
        {/* <Menu.Item key="3" icon={<FormOutlined />}>
          <Link to="/about">About</Link>
        </Menu.Item> */}
      </Menu>
    </Header>
  );
};

export default NavBar;
