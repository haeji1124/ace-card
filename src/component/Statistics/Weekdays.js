import React, { useState } from "react";

import { Star } from "lucide-react";

const Weekdays = () => {
  const [hoveredDay, setHoveredDay] = useState(null);

  const dayStats = [
    { day: "월", count: 28, name: "월요일", percent: 54 },
    { day: "화", count: 32, name: "화요일", percent: 62 },
    { day: "수", count: 45, name: "수요일", percent: 87 },
    { day: "목", count: 39, name: "목요일", percent: 75 },
    { day: "금", count: 52, name: "금요일", percent: 100 },
    { day: "토", count: 15, name: "토요일", percent: 29 },
    { day: "일", count: 12, name: "일요일", percent: 23 },
  ];

  return (
    <>
      {/* 요일별 통계 카드 */}

      <div className="bg-white rounded-2xl p-6 shadow-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-blue-500" />

            <h2 className="text-lg font-semibold text-gray-900">
              요일별 칭찬 통계
            </h2>
          </div>

          <div className="text-sm text-gray-500">이번 주</div>
        </div>

        {/* 바 차트 */}

        <div className="h-64 flex items-end justify-between space-x-2 pt-8">
          {dayStats.map((stat) => (
            <div
              key={stat.day}
              className="relative flex flex-col items-center flex-1 h-full"
              onMouseEnter={() => setHoveredDay(stat.day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <div className="absolute bottom-8 w-full h-full">
                <div
                  className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-400"
                  style={{ height: `${stat.percent}%` }}
                >
                  {hoveredDay === stat.day && (
                    <div className="absolute w-full -top-8">
                      <span className="bg-gray-900 text-white px-2 py-1 rounded text-sm">
                        {stat.count}개
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 text-sm font-medium text-gray-600">
                {stat.day}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          금요일에 가장 많은 칭찬이 작성되었어요! 💌
        </p>
      </div>
    </>
  );
};

export default Weekdays;
