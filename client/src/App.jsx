import { Outlet, Link } from "react-router-dom";
import { Layout, Menu} from 'antd';
import { UserOutlined, LoginOutlined} from '@ant-design/icons';
import { useTheme } from "./ThemeContext";
import './App.css'
import './index.css'


const { Header, Content } = Layout;
const App = () => {
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




    