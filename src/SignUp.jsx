import { useState } from 'react'
//import './App.css'

function SignUp(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConPassword] = useState('');
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConPassword = (event) => {
    setConPassword(event.target.value);
  };
  const handleSignUp = () => {
    alert('You are in SIGNUP page');
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
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
      <input
        type="Confirm Password"
        placeholder="Confirm Password" 
        value={confirmPassword}
        onChange={handleConPassword}
      />
      <br /> 
      <button onClick={handleSignUp}>Sign Up</button>

    </>
  );
}
export default SignUp

