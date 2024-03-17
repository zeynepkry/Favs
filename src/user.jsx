import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Layout, Typography, Form, Input, Modal, Button, Card, Avatar } from 'antd';
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const User = () => {
  const [formData, setFormData] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });
  const inputs = [
    { name: 'facebook', placeholder: '@facebook' },
    { name: 'twitter', placeholder: '@twitter' },
    { name: 'instagram', placeholder: '@instagram' },
    { name: 'linkedin', placeholder: '@linkedin' }
  ];
  //localStorage.setItem('formData', JSON.stringify(formData));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const userInput = localStorage.getItem('userInput');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.setItem('userInput', inputValue); // Save to local storage when modal is closed
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="User">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ background: '#85a5ff', textAlign: 'center' }}>
          <div style={{ marginTop: 20 }}>
            <Avatar size={120} src="https://placekitten.com/g/200/200" />
          </div>
          <br />
          <div>
            <Form action="edit">
              {inputs.map(input => (
                <Input
                  key={input.name}
                  type="text"
                  name={input.name}
                  value={formData[input.name]}
                  onChange={(e) => handleChange(input.name, e.target.value)}
                  placeholder={input.placeholder}
                  style={{ height: '50px', fontSize: '20px', marginBottom: '10px' }}
                />
              ))}
            </Form>
          </div>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 20, textAlign: 'center' }}>
            <Title level={3} style={{ color: '#061178', marginBottom: 0 }}>FAVS</Title>
          </Header>
          <Content style={{ background: '#e6f4ff', textAlign: 'center', padding: '20px' }}>
            <div>
              <Button type="primary" onClick={showModal}>
                Open Modal
              </Button>
              <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <TextArea rows={4} value={inputValue} onChange={handleInputChange} />
              </Modal>
              <Card
                title="Card title"
                bordered={false}
                style={{
                width: 300,
                marginTop: '20px'
                }}
              >
                <p>{userInput}</p>
              </Card>
            </div>
        </Content>
          <Footer style={{ background: '#e6f4ff', textAlign: 'center' }}>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default User;




