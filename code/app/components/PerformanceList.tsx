"use client";

import { useState } from "react";
import PerformanceCard, { PerformanceType } from "./PerformanceCard";
import Navbar from "./Navbar";

type Props = {
  performances: PerformanceType[];
};

export default function PerformanceList({ performances = [] }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<
    "WORLD" | "NATIONAL" | "RISING"
  >("WORLD");

  const filteredPerformances = performances.filter(
    (p) => p.famous_level === selectedLevel
  );

  return (
    <div className="bg-[#b99895] min-h-screen">
      <Navbar />
      <br></br>

      {/* 필터 버튼 */}
      <section className="max-w-[1200px] mx-auto pt-[120px] px-10">
        <div className="flex justify-center items-center gap-6 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedLevel("WORLD")}
            className={`flex-1 py-3.5 rounded-full font-bold text-[18px] transition-all
              ${
                selectedLevel === "WORLD"
                  ? "bg-red-500 text-white"
                  : "bg-white border-2 border-gray-300 text-red-600"
              }`}
          >
            WORLD STAR
          </button>

          <button
            onClick={() => setSelectedLevel("NATIONAL")}
            className={`flex-1 py-3.5 rounded-full font-bold text-[18px] transition-all
              ${
                selectedLevel === "NATIONAL"
                  ? "bg-[#4169E1] text-white"
                  : "bg-white border border-gray-300 text-[#4169E1]"
              }`}
          >
            NATIONAL STAR
          </button>

          <button
            onClick={() => setSelectedLevel("RISING")}
            className={`flex-1 py-3.5 rounded-full font-bold text-[18px] transition-all
              ${
                selectedLevel === "RISING"
                  ? "bg-[#A020F0] text-white"
                  : "bg-white border border-gray-300 text-[#A020F0]"
              }`}
          >
            RISING STAR
          </button>
        </div>
      </section>

      {/* 카드 목록 */}
      <main className="max-w-[1350px] mx-auto p-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {filteredPerformances.map((item) => (
            <PerformanceCard key={item.id} performance={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
