import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConPassword] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [username, setUsername] = useState(''); // State for username
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext
  
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConPassword = (event) => {
    setConPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        email: email,
        username: username,
        userId: user.uid // Add user UID to the data
      };
      await updateProfile(user, {
        displayName: username // Set the username as the displayName
      });
      const idToken = await user.getIdToken(/* forceRefresh */ true);
      const response = await fetch('http://localhost:3000/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ userData }),
      });
      const data = await response.json();
      console.log('Server response ', data);
      alert('User signed up successfully!');
      navigate(`/user/${user.displayName}`);
      login(); // Log in the user after signing up
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <>
      <input 
        type="text"
        placeholder="Email" 
        value={email}
        onChange={handleEmail}
      />
      <br /> 
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
        onChange={handlePassword}
      />
      <br />
      <input
        type="password"
        placeholder="Confirm Password" 
        value={confirmPassword}
        onChange={handleConPassword}
      />
      <br /> 
      <button onClick={handleSignUp}>Sign Up</button>
      <br />
      <p>Do you have an account?</p>
      <button onClick={handleLogIn}>Log In</button>
    </>
  );
}

export default SignUp;
