// Import necessary components and dependencies
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu, Input, Space } from 'antd';
import { UserOutlined, LoginOutlined, AudioOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import './index.css'; // Import custom CSS styles
import 'antd/dist/reset.css';

// Destructure components from antd
const { Header, Content } = Layout;
const { Search } = Input;

// Define suffix icon for the search input
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info?.source, value);

const App = () => {
  return (
    <Layout className="layout">
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
          <Menu.Item key="0">Favs</Menu.Item>
          <Menu.Item key="1"><Link to="/signup"><UserOutlined /> Sign Up</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/login"><LoginOutlined /> Log In</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/user/:username"><UserOutlined /> Your Page</Link></Menu.Item>
        </Menu>
      </Header>
      <Content>
  <div className="app-page site-layout-content">
  <h1 className="welcome-header"> WELCOME TO FAVS </h1>
    
    
 
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    
    <br />
    <br />
    <Row gutter={20}>
      <Col span={8}>
        <Card title="discover your next favourite book" className="custom-card">
        <img
        alt="book"
        src="https://images.unsplash.com/photo-1529473814998-077b4fec6770?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
        </Card>
      </Col>
      <Col span={7}>
        <Card title="there are still good movies to watch, discover now" className="custom-card">
        <img
        alt="movie"
        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
        </Card>
      </Col>
      <Col span={7}>
        <Card title="new flavors are just a click away" className="custom-card">
        <img
        alt="recipe"
        src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
        </Card>
      </Col>
      
    </Row>
    
    
  </div>
  <Outlet />
</Content>
    </Layout>
  );
}

export default App;