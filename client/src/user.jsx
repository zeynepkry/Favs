import React, { useState, useEffect } from 'react';
import { Layout, Typography, Form, Input, Modal, Button, Card, Col, Row , Avatar, Select, Space, Upload, message } from 'antd';
import { EditOutlined, DeleteOutlined, TwitterOutlined, LogoutOutlined,LinkedinOutlined, InstagramOutlined ,PinterestOutlined,SpotifyOutlined,DiscordOutlined  } from '@ant-design/icons';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import ProfilePictureUpload from './pfpUpload'; // Import the ProfilePictureUpload component
import './index.css'
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;
const { Flex } = Space;

const User = () => {
  const [responseData, setResponseData] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  //returns the current users token
  const getAuthToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not logged in');
    }
    return await user.getIdToken(/* forceRefresh */ true);
  };
  const openBookModal = () => {
    setIsBookModalOpen(true);
  };

  const closeBookModal = () => {
    setIsBookModalOpen(false);
  };

  const openMovieModal = () => {
    setIsMovieModalOpen(true);
  };

  const closeMovieModal = () => {
    setIsMovieModalOpen(false);
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
     }
    });
  }, []);

  //sends input (book notes) to the express backend fetching data with post method
  const handleBookOk = async() => {
    setIsBookModalOpen(false);
    localStorage.setItem('userInput', inputValue); // Save to local storage when modal is closed
    const userNote = inputValue; 
    const idToken = await getAuthToken();
    try {
      const response = await fetch('http://localhost:3000/users/userNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
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

  const handleMovieOk =  async() => {
    setIsMovieModalOpen(false);
    localStorage.setItem('userInput', inputValue); // Save to local storage when modal is closed
    const userNote = inputValue; 
    const idToken = await getAuthToken();
    try {
      const response = await fetch('http://localhost:3000/users/userMovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
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
  const handleBookCancel = () => {
    setIsBookModalOpen(false);
  };
  const handleMovieCancel = () => {
    setIsMovieModalOpen(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleUpdateNote = (userNoteId,type) => {
    updateNote(userNoteId,type);
  };;

  //fetch user data from the beckend express code. input goes in an array
  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const idToken = await getAuthToken();
        const response = await fetch('http://localhost:3000/users/userNote', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (!response.ok) 
          throw new Error('Failed to fetch user notes');
        const data = await response.json();
        if (data.myNotes) { // Check for userNotes directly
          setUserNotes(data.myNotes); // Set userNotes directly
        } else {
          setUserNotes([]);
        }
      } catch (error) {
        console.error('Error fetching user notes:', error);
      }
    };
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) 
        fetchUserNotes();
  });
  }, []); 

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        const idToken = await getAuthToken();
        const response = await fetch('http://localhost:3000/users/userMovie', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (!response.ok) 
          throw new Error('Failed to fetch user movies');
        const data = await response.json();
        if (data.myMovies) { // Check for userMovies directly
          setUserMovies(data.myMovies); // Set userMovies directly
        } else {
          setUserMovies([]);
        }
      } catch (error) {
        console.error('Error fetching user movies:', error);
      }
    };

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) 
        fetchUserMovies();
    });
  }, []);
  //takes parameters for note id and the identifier (type) to delete from the board.
  //fetch the data to express endpoint accordingly , deletes from the board 
  const handleDelete = async (noteId, type) => {
    const idToken = await getAuthToken();
    try {
      let endpoint = '';
      let bodyData = { userNoteId: noteId };
      console.log(bodyData)
      if (type === 'movies') {
        endpoint = 'http://localhost:3000/users/userMovie';
      } else if (type === 'books') {
        endpoint = 'http://localhost:3000/users/userNote';
      }
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //logout user and direct it to signin page
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Sign out the user
      console.log("user signed out")
      localStorage.setItem("isLoggedIn", "false");
      navigate('/signup');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  //sends user token to discover page for verifytoken function
  const handleDiscover = async () => {
    try {
      const idToken = await getAuthToken(); 
      if (idToken) {
        navigate(`/discover/${idToken}`); // Pass the token as a URL parameter
      } else {
        console.error("Failed to get authentication token.");
      }
    } catch (error) {
      console.error("Error while handling discovery:", error);
    }
  };
  //updates the note from in the becend by using different endpoints for different collections
  const updateNote = async (noteId, type) => {
    const idToken = await getAuthToken();
    if (!noteId) {
      console.log('Note not found')
    } else {
      console.log("update  " + noteId);
      try {
        const updatedNote = window.prompt('Enter your new note:');
        if (updatedNote === null) {
          // User clicked cancel
          return;
        }
        let bodyData = { userNoteId: noteId, updatedNote  };
        console.log(bodyData)
        let endpoint = '';
        if (type === 'movies') {
          endpoint = 'http://localhost:3000/users/userMovie';
        } else if (type === 'books') {
          endpoint = 'http://localhost:3000/users/userNote';
        }
        const response = await fetch(endpoint, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(bodyData),
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
  //social media buttons listed on the sider
  const SocialMediaButton = ({ icon, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="social-media-button">
      <Button shape="circle" style={{ background: '#2d7aa7', border: 'none', margin: '30px' }}>
        {icon}
      </Button>
    </a>
  );


  return (
    <div className="User">
    <Layout className="user-layout">
    <Sider style={{ background: '#2d7aa7', textAlign: 'center' }}>
      <div style={{ marginTop: 20 }}>
        <ProfilePictureUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <Title level={4} style={{ color: '#fff', marginTop: 10 }}> {currentUser ? currentUser.displayName : ''}</Title>
        <br />
        <br />
        <SocialMediaButton icon={<TwitterOutlined style={{ color: '#fff', fontSize: 50 }} />}  url="https://twitter.com" />
        <SocialMediaButton icon={<LinkedinOutlined style={{ color: '#fff', fontSize: 50 }} />} url="https://linkedin.com"  />
        <SocialMediaButton icon={<InstagramOutlined style={{ color: '#fff', fontSize: 50 }} />} url="https://instagram.com" />
        <SocialMediaButton icon={<PinterestOutlined style={{ color: '#fff', fontSize: 50 }} />} url="https://pinterest.com" />
        <SocialMediaButton icon={<SpotifyOutlined style={{ color: '#fff', fontSize: 50 }} />} url= "https://spotify.com"/>
        <SocialMediaButton icon={<DiscordOutlined style={{ color: '#fff', fontSize: 50 }} />}  url= "https://discord.com"/>
      </div>
    </Sider>
    <Layout>
      <Header className="user-header">
        <Title level={3} className="user-title">FAVS</Title>
        <Button type="primary" className="user-button" onClick={handleDiscover}>Discover</Button>
        <Button type="primary" className="user-button" onClick={handleLogout}><LogoutOutlined /></Button>
      </Header>
      <Content className="user-content">
        <Modal title="Books Modal" visible={isBookModalOpen} onOk={handleBookOk} onCancel={handleBookCancel}>
          <TextArea rows={4} value={inputValue} onChange={handleInputChange} />
        </Modal>
        <Modal title="Movies Modal" visible={isMovieModalOpen} onOk={handleMovieOk} onCancel={handleMovieCancel}>
          <TextArea rows={4} value={inputValue} onChange={handleInputChange} />
        </Modal>
          <Row gutter={[20, 20]}> {/* Adjust gutter as needed */}
            <Col span={12}>
              <Card
                className="user-card"
                cover={<img alt="example" src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />}
                actions={[<EditOutlined key="edit" onClick={openBookModal} />]}
              >
              <Meta title="BOOKS" />
              <br />
                <div className="user-notes">
                  {userNotes.map((note, index) => (
                    <div key={note.id} className="user-note">
                      {note.data.userNote + "   "}
                      <Space>
                        <Button icon={<EditOutlined />} className="user-button" size="small" onClick={() => handleUpdateNote(note.id,"books")} />
                        <Button icon={<DeleteOutlined />} className="user-button" size="small" onClick={() => handleDelete(note.id, "books")} />
                      </Space>
                      {index !== userNotes.length - 1 && <div style={{ marginBottom: '10px' }} />} {/* Add margin after each note except the last one */}
                    </div>
                  ))}
                </div>
              </Card>
              </Col>
              <Col span={12}>
                <Card
                  className="user-card"
                  cover={<img alt="example" src="https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />}
                  actions={[<EditOutlined key="edit" onClick={openMovieModal} />]}
                >
                <Meta title ="MOVIES" />
                <br />
                <div className="user-notes">
                  {userMovies.map((movie,index) => (
                    <div key={movie.id}>
                      {movie.data.userNote + "   "}
                      <Space>
                        <Button icon={<EditOutlined />} className="user-button" size = "small"  onClick={() => handleUpdateNote(movie.id, "movies")} />
                        <Button icon={<DeleteOutlined />} className="user-button"   size = "small" onClick={() => handleDelete(movie.id, "movies")} />
                      </Space>
                      {index !== userNotes.length - 1 && <div style={{ marginBottom: '10px' }} />}
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
          </Content>
        <Footer className="user-footer"></Footer>
      </Layout>
    </Layout>
  </div>

  );
  };
  export default User;
