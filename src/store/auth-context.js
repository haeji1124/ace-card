import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  email:'',
  onLogout: () => {},
  onLogin: (email, password) => {},
  onSignUp : (email, password) => {}
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
    // 사용자 인증
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      alert('이메일 또는 비밀번호가 올바르지 않습니다');
      return
    }

    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('email', email);
    setIsLoggedIn(true);
    setEmail(email);
  };

  const signUpHandler = (email, password) => {
    // 기존 사용자 확인
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === email)){
      throw new Error('이미 가입된 이메일입니다')
    }

    // 새 사용자 추가
    const newUser = {
      email,
      password,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // 회원가입 후 자동 로그인
    loginHandler(email, password);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        email: email,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignUp: signUpHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
