import PerformanceCard, { PerformanceType } from "./PerformanceCard";
import Navbar from "./Navbar";

type Props = {
  performances: PerformanceType[];
};

export default function PerformanceList({ performances = [] }: Props) {
  return (
    <div className="bg-[#b99895] min-h-screen">
      <Navbar />

      {/* 1. 필터 버튼 섹션: 너비 제한 및 크기 축소 */}
      <section className="max-w-[1200px] mx-auto pt-[120px] px-10">
        {/* mx-auto와 max-w-4xl을 사용하여 버튼 세트 전체가 너무 퍼지지 않게 모음 */}
        <div className="flex justify-center items-center gap-6 max-w-4xl mx-auto">
          {/* WORLD STAR: py-4로 높이 줄임, text-lg로 폰트 축소 */}
          <button className="flex-1 py-3.5 bg-white border-2 border-red-500 rounded-full text-red-600 font-bold text-[18px] shadow-sm hover:bg-red-50 transition-all active:scale-95">
            WORLD STAR
          </button>

          {/* NATIONAL STAR */}
          <button className="flex-1 py-3.5 bg-white border border-gray-300 rounded-full text-[#4169E1] font-bold text-[18px] shadow-sm hover:bg-gray-50 transition-all active:scale-95">
            NATIONAL STAR
          </button>

          {/* RISING STAR */}
          <button className="flex-1 py-3.5 bg-white border border-gray-300 rounded-full text-[#A020F0] font-bold text-[18px] shadow-sm hover:bg-gray-50 transition-all active:scale-95">
            RISING STAR
          </button>
        </div>
      </section>

      {/* 2. 카드 목록 섹션 */}
      <main className="max-w-[1350px] mx-auto p-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {performances.map((item) => (
            <PerformanceCard key={item.id} performance={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
