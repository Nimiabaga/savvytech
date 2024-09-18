import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check for stored authentication state on initial load
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [user, setUser] = useState(() => {
    // Load the user data from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userInfo) => {
    // Set isLoggedIn to true and store in localStorage
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");

    // Set user data and store in localStorage
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const logout = () => {
    // Set isLoggedIn to false and remove from localStorage
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");

    // Clear user data from state and localStorage
    setUser(null);
    localStorage.removeItem("user");

    // Optional: Refresh the page
    window.location.reload(true);
  };

  // Optionally, you can use useEffect to monitor and update localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
