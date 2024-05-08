import React from 'react';
import { useParams } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import { Card, Space  } from 'antd';
import {  Row, Col } from 'antd';
const { Meta } = Card;
function Discover() {
  // Use useParams to access the username parameter from the URL
  const { token } = useParams();
  const [userNotes, setUserNotes] = useState([]);
  //console.log(token);
  
  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/allUserNotes');
        const data = await response.json();
        setUserNotes(data.userNotes); // Access userNotes property from response
      } catch (error) {
        console.error('Error fetching user notes:', error);
      }
    };
    fetchUserNotes();
  }, []);

  const UserNotes = ({ userNotes }) => {
    return (
      <Space direction="vertical">
        <Row gutter={[16, 16]}> {/* Add gutter spacing */}
          {userNotes.map((note, index) => (
            <Col span={8} key={index}> {/* Set span to 8 for each card */}
              <Card>
              <Meta title={`${note.user.username}`} description={note.userNote} />
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    );
  };

  return (
    <div style={{ margin: '60px' }}> {/* Add margin around the content */}
      <div>
        <h1>Welcome to favs!</h1>
        <h2>Discover your new favourites</h2>
        <UserNotes userNotes={userNotes} />
      </div>
    </div>
  );

}

export default Discover;