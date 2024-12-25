import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  email:'',
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('')

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const storedUserLoggedInEmail = localStorage.getItem('email');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
      setEmail(storedUserLoggedInEmail)
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('email', email)
    setIsLoggedIn(true);
    setEmail(email)
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        email: email,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
