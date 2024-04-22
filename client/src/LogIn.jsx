
//burda direk gonderyo neden 
//bunu fix etmek icin useeeffect kullansam
//altta yorum olarak ekledim o versyonu




import { useState } from 'react'

function LogIn(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleUsername =  (event) => {
    setUsername(event.target.value);

  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async() => {

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
    console.log("Username:", username);
    console.log("Password:", password);

  };


  return(
    <>
      <input 
        type="text"
        placeholder="Username" 
        value={username}
        onChange={handleUsername}
        
      />
      <br /> 
      <input
        type="password"
        placeholder="Password" 
        value={password}
        onChange={handlePassword}
      />
      <br /> 
      <button onClick={handleLogIn}>Log In</button>

      {responseData && (
        <p>Response from server: {responseData.message}</p>
      )}
    </>
  );
}
export default LogIn





/*


import React, { useState, useEffect } from 'react';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = () => {
    alert('You are in LOGIN page');
    console.log("Username:", username);
    console.log("Password:", password);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
    
        const data = await response.json();
        console.log('Response from server:', data);
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only send request if username has a value
    if (username.trim() !== '') {
      fetchData();
    }
  }, [username]); // Run the effect whenever the username changes

  return (
    <>
      <input 
        type="text"
        placeholder="Username" 
        value={username}
        onChange={handleUsernameChange}
      />
      <br /> 
      <input
        type="password"
        placeholder="Password" 
        value={password}
        onChange={handlePasswordChange}
      />
      <br /> 
      <button onClick={handleLogIn}>Log In</button>

      {responseData && (
        <p>Response from server: {responseData.message}</p>
      )}
    </>
  );
}

export default LogIn;


*/