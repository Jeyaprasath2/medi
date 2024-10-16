import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuthUser, setAuthUser, removeAuthUser, isRememberMeSet } from '../utils/localStorageUtils';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getAuthUser();
    if (storedUser && (isRememberMeSet() || document.cookie.includes('sessionId'))) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData, rememberMe = false) => {
    setUser(userData);
    setAuthUser(userData, rememberMe);
    if (!rememberMe) {
      // Set a session cookie that expires when the browser is closed
      document.cookie = "sessionId=tempSession; path=/;";
    }
  };

  const logout = () => {
    setUser(null);
    removeAuthUser();
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};