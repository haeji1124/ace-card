import React from "react";
import {
  Send,
  ChevronRight,
  Star,
  TrendingUp,
  Award,
  Target,
  Crown,
} from "lucide-react";

function SendCard(props) {
  return (
    <>
      {/* 칭찬 카드 작성 유도 카드 - 호버 효과 */}
      <div className="group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between">
          <div>
            <Star className="w-10 h-10 mb-4 animate-pulse" />
            <h2 className="text-xl font-semibold mb-2">
              오늘의 칭찬, 어떠세요?
            </h2>
            <p className="text-blue-100 mb-6">
              작은 칭찬으로 시작하는 긍정적인 변화,
              <br />
              지금 바로 동료에게 마음을 전해보세요.
            </p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center group-hover:bg-blue-50 transition-colors">
              칭찬 카드 작성하기
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <Send className="w-16 h-16 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>
    </>
  );
}

export default SendCard;
