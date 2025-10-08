import React, { createContext, useState } from 'react'; // <-- useEffect removed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('theemo-auth') === 'true'
  );

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('theemo-auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('theemo-auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};