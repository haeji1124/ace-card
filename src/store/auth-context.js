import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  email: "",
  name: "",
  isInitialized: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  onSignUp: (email, password, name) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    const storedUserLoggedInEmail = localStorage.getItem("email");
    const storedUserLoggedInName = localStorage.getItem("name");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
      setEmail(storedUserLoggedInEmail);
      setName(storedUserLoggedInName);
    }
    setIsInitialized(true);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    // 사용자 인증
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("이메일 또는 비밀번호가 올바르지 않습니다");
      return;
    }
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("email", email);
    localStorage.setItem("name", user.name);
    setIsLoggedIn(true);
    setEmail(email);
    setName(user.name);
  };

  const signUpHandler = (email, password, name) => {
    // 기존 사용자 확인
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((user) => user.email === email)) {
      throw new Error("이미 가입된 이메일입니다");
    }

    // 새 사용자 추가
    const newUser = {
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // 회원가입 후 자동 로그인
    loginHandler(email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        email,
        name,
        isInitialized,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignUp: signUpHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
