import React, { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import { Layout, Typography, Form, Input, Modal, Button, Card, Avatar, Select, Space } from 'antd';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;


const User = () => {
 
const [responseData, setResponseData] = useState(null);
const [searchValue, setSearchValue] = useState('');

const [isModalOpen, setIsModalOpen] = useState(false);
const [inputValue, setInputValue] = useState('');
const userInput = localStorage.getItem('userInput');
const showModal = () => {
   setIsModalOpen(true);
 };

  const handleOk = async() => {
    setIsModalOpen(false);
    localStorage.setItem('userInput', inputValue); // Save to local storage when modal is closed
    const userNote = inputValue; 
    try {
      const response = await fetch('http://localhost:3000/users/userNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userNote }), // Send userNote in the request body
      });
      const data = await response.json();
      console.log('Server response ', data);
      setResponseData(data);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleUpdateNote = () => {
    updateNote(inputValue);
  };
  const [userNotes,setUserNotes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/users/userNote')
      .then(response => response.json())
      .then(data => {
        setUserNotes(data.userNotes);
      })
      .catch(error => {
        console.error('Error fetching user notes:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once, when component mounts

  const searchUserNote = (searchTerm) => {
    // Use Array.find() to search for the user note with the matching search term
    const foundNote = userNotes.find(note => note.data.userNote === searchTerm);
    
    // If the note is found, return its ID, otherwise return null
    return foundNote ? foundNote.id : null;
  };


  const handleDelete = async () => {
    setIsModalOpen(false);
    const userNoteId = searchUserNote(inputValue); 
    try {
      const response = await fetch('http://localhost:3000/users/userNote', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // You may or may not need to send data in the body for a DELETE request
         body: JSON.stringify({ userNoteId }), 
      });
  
      const data = await response.json();
      console.log('Server response ', response);
      
      // Handle response status as needed
      if (response.ok) {
        console.log(data);

        // Success message or further action
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };
  //simdi de soun serach calismiyo neden anlamadim
  const updateNote = async (searchValue) => {
    console.log(searchValue);
    const userNoteId = searchUserNote(searchValue)
    if (!userNoteId) {
      console.log('Note not found')
    } else {
      console.log("trying to update  " + userNoteId);
      try {
        const updatedNote = 'updatedNote'
        const response = await fetch(`http://localhost:3000/users/userNote`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userNoteId, updatedNote }),
        });
        if (response.ok) {
          const data = await response.json(); 
          console.log('Note updated successfully:', data);
        } else {
          console.error('Failed to update note:', response.statusText)
        }
      } catch (error) {
        console.error('Error updating note:', error)
      }
    }
  };



 
return (
   
   <div className="User">
     <Layout style={{ minHeight: '100vh' }}>
       <Sider style={{ background: '#85a5ff', textAlign: 'center' }}>
         <div style={{ marginTop: 20 }}>
           <Avatar size={120} src= " https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
         </div>
         <br />
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
             <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}  >
                 <TextArea rows={4} value={inputValue} onChange={handleInputChange} />
                 <Button style={{ background: 'pink'}} key="delete" type="danger" onClick={handleDelete}>
                    Delete
                 </Button>
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
             <br />
             <Card
              title="User Notes"
              style={{ width: 500 }}
            >
              <ul>
                {userNotes.map((note) => (
                  <li key={note.id}>
                    <strong>ID:</strong> {note.id}, <strong>User Note:</strong> {note.data.userNote}
                  </li>
                ))}
              </ul>
            </Card>
           </div>
            <Space.Compact
              style={{
                width: '30%',
              }}
            >
              <Input defaultValue="Search for a note" onChange={handleInputChange} />
              <Button type="primary" onClick={handleUpdateNote}>
                Update
              </Button>
            </Space.Compact>
         </Content>
         <Footer style={{ background: '#e6f4ff', textAlign: 'center' }}>Footer</Footer>
       </Layout>
     </Layout>
   </div>
 );
};
export default User;











