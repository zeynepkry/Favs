import './App.css'
import { Outlet, Link } from "react-router-dom";
function App() {
  return(
    <>
     <h1>Favs</h1>
        <nav>
          <ul>
            <li>
              <Link to ={`/signup`}>Sign Up</Link>
            </li>
            <li>
              <Link to ={`/login`}>Log In</Link>
            </li>
            <li>
            <Link to={`/user`}>Your Page</Link> 
            </li>
          </ul>
        </nav>
        <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App

