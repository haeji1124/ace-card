import { useContext } from "react";
import MainHeader from "./component/MainHeader";
import AuthContext, { AuthContextProvider } from "./store/auth-context";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import FloatingButton from "./component/UI/FloatingButton/FloatingButton";

function App() {
  const ctx = useContext(AuthContext)
  return (
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <><Home/><FloatingButton/></>}
      </main>
    </>
  );
}

export default function AppWithContext() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}