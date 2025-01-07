import { useContext } from "react";
import MainHeader from "./component/MainHeader";
import AuthContext, { AuthContextProvider } from "./store/auth-context";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import FloatingButton from "./component/UI/FloatingButton/FloatingButton";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./component/SignUp/SignUp";
import Inbox from "./component/MessageCards/Inbox";

function App() {
  const ctx = useContext(AuthContext);

  // 전체 인증 상태 로깅
  console.log('App rendered. Auth state:', {
    isLoggedIn: ctx.isLoggedIn,
    email: ctx.email,
    currentPath: window.location.pathname
  });

  // 초기화되지 않았다면 아무것도 렌더링하지 않음
  if (!ctx.isInitialized) {
    return null; // 또는 로딩 스피너를 보여줄 수 있습니다
  }

    return (
      <>
        <MainHeader />
        <main>
          <Routes>
            <Route
              path="/login"
              element={!ctx.isLoggedIn ? <Login /> : <Navigate to="/" replace />}
            />
            <Route
              path="/signup"
              element={!ctx.isLoggedIn ? <SignUp /> : <Navigate to="/" replace />}
            />
            <Route
              path="/inbox"
              element={ctx.isLoggedIn ? <Inbox /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/"
              element={
                ctx.isLoggedIn ? (
                  <>
                    <Home />
                    <FloatingButton />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to={ctx.isLoggedIn ? "/" : "/login"} replace />} />
          </Routes>
        </main>
      </>
    );
}

export default function AppWithContext() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
