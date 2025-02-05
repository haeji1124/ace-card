import React, { useState } from "react";
import {
  Send,
  TrendingUp,
  Award,
  Target,
  Crown,
  Medal,
  Smile,
} from "lucide-react";
import Weekdays from "./Weekdays";
import Badges from "./Badges";

export default function Statistics() {
  const [selectedStat, setSelectedStat] = useState("weekly");

  // 통계 데이터
  const stats = {
    weekly: {
      received: 12,
      sent: 8,
      engagement: 92,
      topTeams: ["개발팀", "디자인팀", "기획팀"],
    },

    monthly: {
      received: 45,
      sent: 32,
      engagement: 87,
      topTeams: ["디자인팀", "개발팀", "마케팅팀", "Design Technology팀"],
    },
  };

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
      <div className="bg-white rounded-2xl p-6 shadow-lg col-span-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900">칭찬 통계</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedStat("weekly")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedStat === "weekly"
                  ? "bg-purple-100 text-purple-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              주간
            </button>
            <button
              onClick={() => setSelectedStat("monthly")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedStat === "monthly"
                  ? "bg-purple-100 text-purple-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              월간
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {/* 받은 칭찬 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium text-gray-700">받은 칭찬</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {stats[selectedStat].received}
            </p>
          </div>

          {/* 보낸 칭찬 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Send className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-700">보낸 칭찬</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {stats[selectedStat].sent}
            </p>
          </div>

          {/* 참여율 */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-700">참여율</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {stats[selectedStat].engagement}%
            </p>
          </div>

          {/* 최다 칭찬 팀 */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <h3 className="font-medium text-gray-700">최다 칭찬 팀</h3>
            </div>
            <p className="text-lg font-bold text-yellow-600">
              {stats[selectedStat].topTeams[0]}
            </p>
          </div>
        </div>

        {/* 추가 통계 */}
        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-medium text-gray-700 mb-3">팀별 칭찬 순위</h3>
          <div className="space-y-3">
            {stats[selectedStat].topTeams.map((team, index) => (
              <div key={team} className="flex items-center">
                <span className="w-6 text-gray-500">{index + 1}</span>
                <div className="flex-1 ml-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-progressBar"
                      style={{
                        width: `${100 - index * 20}%`,
                        animationDelay: `${index * 200}ms`,
                      }}
                    />
                  </div>
                </div>
                <span className="ml-3 font-medium text-gray-700">{team}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Weekdays />
      <Badges />

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }

          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }

          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes progressBar {
          from {
            width: 0;
          }

          to {
            width: 100%;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-progressBar {
          animation: progressBar 1s ease-out forwards;
        }
      `}</style>
    </>
  );
}
