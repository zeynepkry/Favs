
/*
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import App from './App.jsx';
import ErrorPage from "./errorpage";
import LogIn from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import User from "./user.jsx";
import Discover from "./discover.jsx";

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
    path: "/discover/:token", // Add the route for the discover page
    element: <Discover />,
  },
  {
    path: "/user", // Update the path to "/users/:userId"
    element: <User />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider isSignedIn={false}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
*/
/*
import * as React from "react";
import ReactDOM from "react-dom"; // Import ReactDOM
import { createBrowserRouter, RouterProvider, useRoutes } from "react-router-dom";
import { UserProvider, useUser } from './ContextProvider'; // Importing UserProvider and useUser
import App from './App.jsx';
import ErrorPage from "./errorpage";
import LogIn from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import User from "./user.jsx";
import Discover from "./discover.jsx";

// AuthChecker component to handle authentication logic
const AuthChecker = ({ children }) => {
  const { token } = useUser();
  
  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page or show an error message
    return <LogIn />;
  }
  
  // If authenticated, render the children
  return children;
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
    path: "/discover/:token", // Add the route for the discover page
    element: <Discover />,
  },
  {
    path: "/user",
    element: <AuthChecker><User /></AuthChecker>, // Wrap User component with AuthChecker
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}>
        {useRoutes(routes)}
      </RouterProvider>
    </UserProvider>
  </React.StrictMode>
);

*/


/*
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx';
import ErrorPage from "./errorpage";
//import './index.css'
import LogIn from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import User from "./user.jsx";
import Discover from "./discover.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


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
    path: "/discover/:token", // Add the route for the discover page
    element: <Discover />,
  },
  {
    path: "/user", // Update the path to "/users/:userId"
    element: <User />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
*/

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
//import { ThemeProvider } from "./ThemeContext"; // Import the ThemeProvider

const AuthenticatedRoute = ({ element, ...rest }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Login to continue")
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
    path: "/user",
    element: <AuthenticatedRoute element={<User />} />, // Use AuthenticatedRoute for /user
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap your app with AuthProvider */}
        <RouterProvider router={router} />

    </AuthProvider>
  </React.StrictMode>
);
