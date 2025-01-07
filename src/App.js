import { useContext } from "react";
import MainHeader from "./component/MainHeader";
import AuthContext, { AuthContextProvider } from "./store/auth-context";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import FloatingButton from "./component/UI/FloatingButton/FloatingButton";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./component/SignUp/SignUp";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <MainHeader />
      <main>
        <Routes>
          {!ctx.isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
          {ctx.isLoggedIn && (
            <>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <FloatingButton />
                  </>
                }
              />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/signup" element={<Navigate to="/" replace />} />
            </>
          )}
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
