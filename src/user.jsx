/*
import React, { useState } from "react";
import { Form } from "react-router-dom";
import { DatePicker } from 'antd';

export default function User() {


  const user = {
    pp: "https://placekitten.com/g/200/200",
  };

  return (
   
      <div>
        <img
          key={user.pp}
          src={user.pp || null}
          alt="Avatar"
        />
      </div>
    
  );
}
*/

import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Layout, Typography, Form } from 'antd';
import { Avatar } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const User = () => {
  const [formData, setFormData] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="User">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ background: '#85a5ff', textAlign: 'center' }}>
          <div style={{ marginTop: 20 }}>
            <Avatar size={120} src="https://placekitten.com/g/200/200" />
          </div>
          Sider
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 20, textAlign: 'center' }}>
            <Title level={3} style={{ color: '#061178', marginBottom: 0 }}>FAVS</Title>
          </Header>
          <Content style={{ background: '#e6f4ff', textAlign: 'center', padding: '20px' }}>
              <div>
                <Form action="edit">
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="@facebook"
                    style={{ height: "50px", fontSize: "20px", marginBottom: "10px" }}
                  />
                  <br />
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="@twitter"
                    style={{ height: "50px", fontSize: "20px", marginBottom: "10px" }}
                  />
                  <br />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@instagram"
                    style={{ height: "50px", fontSize: "20px", marginBottom: "10px" }}
                  />
                  <br />
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="@linkedin"
                    style={{ height: "50px", fontSize: "20px", marginBottom: "10px" }}
                  />
                </Form>
              </div>
          </Content>
          <Footer style={{ background: '#e6f4ff', textAlign: 'center' }}>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default User;
