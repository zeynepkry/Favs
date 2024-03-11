import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx';
import ErrorPage from "./errorpage";
import './index.css'
import LogIn from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import User from "./user.jsx";
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
    path: "/user", // Update the path to "/users/:userId"
    element: <User />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);