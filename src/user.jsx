import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Layout, Typography, Form, Input, Modal, Button, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;




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
           <Avatar size={120} src= " https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
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
               style={{
                 width: 300,
                 marginTop: '20px'
               }}
               cover={
                 <img
                   alt="example"
                   src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                 />
               }
               actions={[
                // <SettingOutlined key="setting" />,
                <EditOutlined key="edit" onClick={showModal} />,
                // <EllipsisOutlined key="ellipsis" />,
               ]}
             >
               <Meta
                 //avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                 title="BOOKS"
                 description= {userInput}
               />
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











