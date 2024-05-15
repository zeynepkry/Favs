import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useEffect } from 'react'
import App from './App.jsx';
import ErrorPage from "./errorpage";
import LogIn from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import User from "./user.jsx";
import Discover from "./discover.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { AuthProvider,useAuth } from "./AuthContext"; // Import the AuthProvider

const AuthenticatedRoute = ({ element, ...rest }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("directed to login page ")
      navigate('/login');
   
    }
  }, [isLoggedIn, navigate]); // Include navigate in the dependency array

  // Render the route element if user is logged in
  return isLoggedIn ? React.cloneElement(element, rest) : null;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/discover/:token",
    element: <Discover />,
  },
  {
    path: "/user/:username",
    element: <AuthenticatedRoute element={<User />} />, // Use AuthenticatedRoute for /user
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the app with AuthProvider */}
        <RouterProvider router={router} />

    </AuthProvider>
  </React.StrictMode>
);
