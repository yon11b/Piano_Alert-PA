// app/seats/page.tsx
"use client";

import dynamic from "next/dynamic";
import Navbar from "@/app/components/Navbar";

const SeatingChart = dynamic(() => import("@/app/components/SeatingChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
      좌석 배치도를 로딩 중입니다...
    </div>
  ),
});

export default function SeatingPage() {
  return (
    <div className="bg-[#b99895] min-h-screen">
      <Navbar />
      <main className="min-h-screen bg-[#F3F4F6] p-4 md:p-10 flex flex-col items-center mt-24">
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          <div className="bg-[#4A3F3F] p-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">예술의 전당 콘서트홀 - 1층</h1>
            <p className="text-sm opacity-80">
              마우스 드래그로 이동 / 휠로 확대
            </p>
          </div>

          {/* 컨테이너 높이를 800px로 넉넉하게 잡고, 내부 Chart가 꽉 차게 설정 */}
          <div className="w-full h-[850px] bg-[#E5E7EB] flex items-center justify-center overflow-hidden cursor-move">
            <SeatingChart />
          </div>
        </div>
      </main>
    </div>
  );
}
