import React, { useState } from "react";
import { Cake, ChevronRight, Heart, X } from "lucide-react";

const BirthdayCard = () => {
  const [showBirthdayList, setShowBirthdayList] = useState(false);

  // 더 많은 테스트 데이터
  const birthdayPeople = [
    { id: 1, name: "김영희", team: "디자인팀", birthday: "12월 8일" },
    { id: 2, name: "이철수", team: "개발팀", birthday: "12월 10일" },
    { id: 3, name: "박지민", team: "기획팀", birthday: "12월 12일" },
    { id: 4, name: "정민수", team: "마케팅팀", birthday: "12월 8일" },
    { id: 5, name: "한소희", team: "디자인팀", birthday: "12월 9일" },
    { id: 6, name: "강동원", team: "개발팀", birthday: "12월 11일" },
    { id: 7, name: "이지은", team: "기획팀", birthday: "12월 12일" },
    { id: 8, name: "김태리", team: "마케팅팀", birthday: "12월 13일" },
    { id: 9, name: "최우식", team: "개발팀", birthday: "12월 14일" },
    { id: 10, name: "박서준", team: "기획팀", birthday: "12월 15일" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 w-150">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-pink-100 p-2 rounded-lg">
              <Cake className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              이번 주 생일인 동료
            </h3>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">
              나를 칭찬해준 동료 중 {birthdayPeople.length}명이
              <br />
              이번 주에 생일을 맞이합니다!
            </p>
          </div>

          {showBirthdayList ? (
            <div className="relative">
              {/* 스크롤 영역 */}

              <div
                className="space-y-3 mt-4 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar"
                style={{
                  scrollbarWidth: "thin",

                  scrollbarColor: "#E5E7EB transparent",
                }}
              >
                {birthdayPeople.map((person, index) => (
                  <div
                    key={person.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{person.name}</p>
                      <p className="text-sm text-gray-500">
                        {person.team} · {person.birthday}
                      </p>
                    </div>
                    <button className="flex items-center space-x-1 text-sm text-pink-600 hover:text-pink-700 group whitespace-nowrap ml-2">
                      <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />

                      <span>축하 메시지</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* 닫기 버튼 */}

              <button
                onClick={() => setShowBirthdayList(false)}
                className="absolute -top-1 -right-1 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowBirthdayList(true)}
              className="text-pink-600 hover:text-pink-700 font-medium flex items-center group"
            >
              생일인 동료 보기
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;

          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;

            transform: translateY(-8px);
          }

          to {
            opacity: 1;

            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BirthdayCard;
