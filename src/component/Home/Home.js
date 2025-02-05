import React, { useState } from "react";
import {
  Gift,
  Send,
  Users,
  Calendar,
  ChevronRight,
  Cake,
  Star,
  Heart,
  TrendingUp,
  Award,
  Target,
  Crown,
} from "lucide-react";
import BirthdayCard from "../BirthdayCard/BirthdayCard";
import SendCard from "../../SendCard/SendCard";
import Statistics from "../Statistics/Statistics";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 상단 인사 섹션 - 슬라이드 인 애니메이션 */}
      <section className="animate-slideDown">
        <h1 className="text-2xl font-bold text-gray-900">
          오늘도 좋은 하루 보내세요! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          동료들과 따뜻한 칭찬을 나누어보세요.
        </p>
      </section>

      {/* 카드 그리드 - 페이드 인 애니메이션 */}
      <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
        {/* 칭찬 카드 작성 유도 카드 - 호버 효과 */}
        <SendCard />

        {/* 생일자 알림 카드 - 슬라이드 효과 */}
        <BirthdayCard />

        {/* 확장된 통계 카드 */}
        <Statistics />
      </div>
    </div>
  );
};

export default Home;
