import React from "react";
import { Award, Crown, Medal, Smile } from "lucide-react";

export default function Badges() {
  // 최근 배지 획득 소식

  const badgeNews = [
    {
      id: 1,
      user: "김영희",
      team: "디자인팀",
      badge: "연속 칭찬왕",
      icon: <Medal className="w-5 h-5 text-yellow-500" />,
      description: "3주 연속 칭찬을 작성했어요!",
      time: "10분 전",
    },
    {
      id: 2,
      user: "이철수",
      team: "개발팀",
      badge: "팀워크 챔피언",
      icon: <Crown className="w-5 h-5 text-purple-500" />,
      description: "한 주간 가장 많은 칭찬을 받았어요!",
      time: "2시간 전",
    },
    {
      id: 3,
      user: "박지민",
      team: "기획팀",
      badge: "긍정 전파자",
      icon: <Smile className="w-5 h-5 text-blue-500" />,
      description: "10명 이상에게 칭찬을 보냈어요!",
      time: "3시간 전",
    },
  ];
  return (
    <>
      {/* 최근 배지 획득 소식 */}

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-purple-500" />

            <h2 className="text-lg font-semibold text-gray-900">
              새로운 배지 소식
            </h2>
          </div>

          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            전체보기
          </button>
        </div>

        <div className="space-y-6">
          {badgeNews.map((news) => (
            <div
              key={news.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="bg-white p-2 rounded-lg shadow-sm">
                {news.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {news.user}

                    <span className="text-gray-500 mx-2">·</span>

                    <span className="text-gray-500">{news.team}</span>
                  </p>

                  <span className="text-xs text-gray-500">{news.time}</span>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium text-purple-600">
                    {news.badge}
                  </span>{" "}
                  배지를 획득했어요!
                </p>

                <p className="text-sm text-gray-500 mt-1">{news.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
