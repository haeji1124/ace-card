import React, { useContext, useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Crown,
  Diamond,
  Flame,
  Heart,
  LogIn,
  LogOut,
  Medal,
  MessageCircle,
  Shield,
  Sparkle,
  Sparkles,
  Star,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import AuthContext from "../store/auth-context";

const MainHeader = () => {
  const userData = {
    monthlyPoints: 450,
    totalPoints: 2840,
    introduction:
      "안녕하세요! 저는 개발팀에서 일하고 있습니다. 긍정적인 피드백으로 팀원들과 함께 성장하고 싶습니다😎",
    badges: [
      {
        icon: <Trophy className="w-5 h-5 text-yellow-500" />,
        title: "11월 최다 수신자",
        description: "24년 11월 한달 간 가장 많은 칭찬을 받았습니다",
        date: "2024.11",
      },
      {
        icon: <Star className="w-5 h-5 text-blue-500" />,
        title: "최초 발신자",
        description: "서비스 첫 칭찬을 작성했습니다.",
        date: "2024.10",
      },
      {
        icon: <Medal className="w-5 h-5 text-purple-500" />,
        title: "연속 칭찬왕",
        description: "3주 연속 칭찬을 보냈습니다",
        date: "2024.11",
      },
      {
        icon: <Diamond className="w-5 h-5 text-purple-500" />,
        title: "올해의 칭찬왕",
        description: "24년 전체 1위 달성",
        date: "2024.12",
      },
      {
        icon: <Flame className="w-5 h-5 text-purple-500" />,
        title: "우왕왕",
        description: "3주 연속 칭찬을 보냈습니다",
        date: "2024.11",
      },
      {
        icon: <Shield className="w-5 h-5 text-purple-500" />,
        title: "????",
        description: "3주 연속 칭찬을 보냈습니다",
        date: "2024.11",
      },
      {
        icon: <Crown className="w-5 h-5 text-purple-500" />,
        title: "부서 챔피언",
        description: "부서 내 최다 칭찬 수신(Design Technology팀)",
        date: "2024.11",
      },
      {
        icon: <Heart className="w-5 h-5 text-purple-500" />,
        title: "????",
        description: "3주 연속 칭찬을 보냈습니다",
        date: "2024.11",
      },
      {
        icon: <Sparkle className="w-5 h-5 text-purple-500" />,
        title: "?????",
        description: "3주 연속 칭찬을 보냈습니다",
        date: "2024.11",
      },
    ],
  };

  const authCtx = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  // import {
  //   Trophy,      // 트로피
  //   Medal,       // 메달
  //   Star,        // 별
  //   Award,       // 상장/어워드
  //   Crown,       // 왕관
  //   Heart,       // 하트
  //   ThumbsUp,    // 좋아요
  //   Flame,       // 불꽃
  //   Target,      // 타겟
  //   Sparkles,    // 반짝이
  //   Zap,         // 번개
  //   Diamond,     // 다이아몬드
  //   Gift,        // 선물
  //   Badge,       // 배지
  //   Shield,      // 방패
  //   Gem          // 보석
  // } from 'lucide-react';

  // 배지 아이디어들을 카테고리별로 나눠보면:

  // 1. 활동량 관련 배지
  // - 🏆 첫 칭찬 달성 (Trophy)
  // - ⚡ 연속 10일 칭찬 (Zap)
  // - 💫 월 30개 칭찬 작성 (Sparkles)
  // - 🎯 주간 목표 달성 (Target)

  // 2. 영향력 관련 배지
  // - 👑 부서 내 최다 영향력 (Crown)
  // - 💎 전체 1위 칭찬러 (Diamond)
  // - 🛡️ 신뢰도 최상위 1% (Shield)
  // - ⭐ 베스트 피드백 선정 (Star)

  // 3. 특별한 순간 배지
  // - 🎁 생일자 첫 칭찬 (Gift)
  // - ❤️ 가장 많은 공감 획득 (Heart)
  // - 🌟 신입 환영 첫 칭찬 (Sparkles)
  // - 🏅 분기별 MVP (Medal)

  // 4. 성장 관련 배지
  // - 📈 최다 성장률 (trending-up 아이콘)
  // - 💪 꾸준한 성장왕 (Flame)
  // - 🎨 창의적인 피드백 (Lightbulb)
  // - 🌱 신입 멘토링 (Users)

  // 5. 시즌성 배지
  // - 🎄 12월 산타 칭찬왕
  // - 🌺 봄맞이 첫 칭찬
  // - 🎉 연말 결산 TOP 기여자
  // - 🌈 새학기 응원왕

  return (
    <>
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
                  <a href="/" className="text-gray-600 hover:text-gray-900">
                    홈
                  </a>
                </li>
                <li>
                  <a
                    href="/outbox"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    보낸 칭찬함
                  </a>
                </li>
                <li>
                  <a
                    href="/inbox"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    받은 칭찬함
                  </a>
                </li>
              </ul>
            </nav>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {authCtx.isLoggedIn && authCtx.name}
                </p>
                <p className="text-xs text-gray-500">
                  {authCtx.isLoggedIn && authCtx.email}
                </p>
              </div>
              {authCtx.isLoggedIn && (
                <div
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={toggleSidebar}
                >
                  <User className="w-5 h-5 text-gray-500 cursor-pointer" />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-96 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
        {authCtx.isLoggedIn ? (
          <>
            {/* 상단 고정 영역 */}
            <div className="flex-shrink-0">
              {/* 프로필 섹션 */}
              <div className="p-8 flex flex-col items-center border-b">
                {/* 프로필 이미지 */}
                <div className="w-28 h-28 rounded-full bg-gray-200 mb-4 overflow-hidden">
                  <User className="w-28 h-28 text-gray-500" />
                </div>
                {/* 유저 정보 */}
                <div className="text-center">
                  <h3 className="font-semibold text-xl text-gray-900">
                    {authCtx.isLoggedIn && authCtx.name} 님
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {authCtx.isLoggedIn && authCtx.email}
                  </p>
                </div>
                {/* 포인트 정보 섹션 */}
                <div className="px-6 py-4 bg-gray-50">
                  <div className="flex items-center justify-center mb-3">
                    <Award className="flex items-center text-yellow-500 mr-2" />
                    <span className="font-medium text-gray-700">
                      포인트 현황
                    </span>
                  </div>

                  <div className="flex gap-4">
                    {/* 이번달 포인트 */}
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500 mb-1">이번달</p>
                      <p className="text-xl font-bold text-blue-600">
                        {userData.monthlyPoints.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500 ml-1">
                          P
                        </span>
                      </p>
                    </div>
                    {/* 누적 포인트 */}
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500 mb-1">누적</p>
                      <p className="text-xl font-bold text-indigo-600">
                        {userData.totalPoints.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500 ml-1">
                          P
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 스크롤 가능한 영역 */}
            <div className="flex-1 overflow-y-auto">
              {/* 자기소개 섹션 */}
              <div className="px-6 py-4">
                <h4 className="font-medium text-gray-700 mb-2">소개</h4>
                <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-lg">
                  {userData.introduction}
                </p>
              </div>

              {/* 배지 섹션 */}
              <div className="px-6 py-4 flex-1">
                <h4 className="font-medium text-gray-700 mb-3">나의 배지</h4>
                <div className="space-y-3">
                  {userData.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start">
                        <div className="bg-gray-50 p-2 rounded-lg">
                          {badge.icon}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-start">
                            <h5 className="font-medium text-gray-900">
                              {badge.title}
                            </h5>
                            <span className="text-xs text-gray-500">
                              {badge.date}
                            </span>
                          </div>
                          <p className="test-sm test-gray-600 mt-1">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* 로그아웃 버튼 */}
            <div className="flex-shrink-0 p-4 border-t">
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={authCtx.onLogout}
              >
                <LogOut className="w-5 h-5" />
                <span>로그아웃</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="h-full flex flex-col p-6">
              {" "}
              {/* 환영 메시지 */}{" "}
              <div className="text-center py-8 px-4">
                {" "}
                <div className="flex justify-center mb-6">
                  {" "}
                  <div className="bg-blue-100 rounded-full p-4">
                    {" "}
                    <MessageCircle className="w-8 h-8 text-blue-600" />{" "}
                  </div>{" "}
                </div>{" "}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {" "}
                  동료들과 함께 성장해요!{" "}
                </h2>{" "}
                <p className="text-gray-600 mb-6">
                  {" "}
                  칭찬과 격려로 만들어가는 <br></br>긍정적인 피드백 문화{" "}
                </p>{" "}
              </div>{" "}
              {/* 서비스 특징 */}{" "}
              <div className="space-y-6 flex-1">
                {" "}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  {" "}
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    {" "}
                    <Trophy className="w-5 h-5 text-yellow-600" />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <h3 className="font-medium text-gray-900 mb-1">
                      {" "}
                      특별한 순간을 기억하세요{" "}
                    </h3>{" "}
                    <p className="text-sm text-gray-600">
                      {" "}
                      동료의 성과와 노력을 칭찬으로 기록하세요{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  {" "}
                  <div className="bg-green-100 p-2 rounded-lg">
                    {" "}
                    <Users className="w-5 h-5 text-green-600" />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <h3 className="font-medium text-gray-900 mb-1">
                      {" "}
                      함께 성장하는 문화{" "}
                    </h3>{" "}
                    <p className="text-sm text-gray-600">
                      {" "}
                      긍정적인 피드백으로 더 나은 팀을 만들어요{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  {" "}
                  <div className="bg-purple-100 p-2 rounded-lg">
                    {" "}
                    <Sparkles className="w-5 h-5 text-purple-600" />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <h3 className="font-medium text-gray-900 mb-1">
                      {" "}
                      나만의 배지 컬렉션{" "}
                    </h3>{" "}
                    <p className="text-sm text-gray-600">
                      {" "}
                      특별한 순간마다 획득하는 유니크한 배지{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* 로그인 버튼 */}{" "}
              <div className="mt-8">
                {" "}
                <p className="text-center text-sm text-gray-500 mb-4">
                  {" "}
                  로그인하고 동료들과 칭찬을 나누어보세요!{" "}
                </p>{" "}
              </div>{" "}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainHeader;
