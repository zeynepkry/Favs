import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSignUp = () =>{
    navigate('/signup');
  }

  const handleLogIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('User logged in successfully!');
        login(); // Call the login function from AuthContext
        navigate('/user');
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
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
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
      <br />
      <p>Don't have an account?</p>
      <button onClick={handleSignUp}>Sign up</button>
    </>
  );
}

export default LogIn;


/*
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
function LogIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();
  const handleEmail =  (event) => {
    setEmail(event.target.value);

  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async() => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('User logged in successfully!');
      //bu yanlis username i baska sekilde almam grekiyor sanirim cunku burda ulasamiyorum usernamee
      //navigate(`/user/${userCredential.username}`);
      navigate('/user');
      console.log('User:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.error(errorCode, errorMessage);
    });

  };
  return(
    <>
      <input 
        type="text"
        placeholder="Email" 
        value={email}
        onChange={handleEmail}
        
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
*/