/*
import React, { createContext, useState, useContext } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
*/

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

console.log(localStorage.getItem("isLoggedIn"));
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  useEffect(() => {
    // Check local storage on component mount
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (storedIsLoggedIn !== isLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);