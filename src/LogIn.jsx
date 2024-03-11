import { useState } from 'react'
import './index.css'
function LogIn(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = () => {
    alert('You are in LOGIN page');
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
    </>
  );
}
export default LogIn

