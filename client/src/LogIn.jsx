import React, { useState } from 'react'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from './firebase'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

function LogIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // Access the login function from AuthContext
  const { login } = useAuth();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  // Event handler for log in button click
  const handleLogIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('User logged in successfully!');
        login();
        navigate(`/user/${user.displayName}`);
        console.log('User:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <>
      {/* Email input field */}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
      />
      <br />
      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
      />
      <br />
      {/* Log in button */}
      <button onClick={handleLogIn}>Log In</button>
      <br />
      {/* Sign up button */}
      <p>Don't have an account?</p>
      <button onClick={handleSignUp}>Sign up</button>
    </>
  );
}

export default LogIn;
