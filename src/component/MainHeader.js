import React, { useContext } from "react";
import { User } from "lucide-react";
import AuthContext from "../store/auth-context";

const MainHeader = () => {
  const user = {
    name: "홍길동",
  };
  const authCtx = useContext(AuthContext);

  return (
    <header className="w-full bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">로고</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  홈
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  서비스
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  문의하기
                </a>
              </li>
            </ul>
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {authCtx.isLoggedIn && user.name}
              </p>
              <p className="text-xs text-gray-500">
                {authCtx.isLoggedIn && authCtx.email}
              </p>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
