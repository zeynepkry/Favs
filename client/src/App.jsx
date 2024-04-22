import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, Image } from 'antd';
import { UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import './App.css'
import './index.css'
import React, { useState, useEffect } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjQluZHyKDKCHPgh4vpGVMyvHhgRaro-8",
  authDomain: "favs-669fd.firebaseapp.com",
  projectId: "favs-669fd",
  storageBucket: "favs-669fd.appspot.com",
  messagingSenderId: "449419071456",
  appId: "1:449419071456:web:7501af936288439d466585",
  measurementId: "G-E1W25M9WGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const { Header, Content } = Layout;

const App = () => {
  /*
  const [username, setUsername] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
      });

      const data = await response.json();
      console.log('Response from server:', data);
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };
  */


  return (
    <Layout className="layout">
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
          <Menu.Item key="0">Favs</Menu.Item>
          <Menu.Item key="1"><Link to="/signup"><UserOutlined /> Sign Up</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/login"><LoginOutlined /> Log In</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/user"><UserOutlined /> Your Page</Link></Menu.Item>
        </Menu>
      </Header>
      <Content >
        <div className="site-layout-content">
         
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default App;




 /*
        <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

    </div>
    */



    