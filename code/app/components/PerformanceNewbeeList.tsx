"use client";

import { useState } from "react";
import Navbar from "./Navbar";

// 데이터 타입 정의 (기존 PerformanceType이 있다면 확장해서 사용하세요)
export type PerformanceType = {
  id: number;
  title: string;
  date_start: string;
  date_finish: string;
  location: string;
  price: string;
  program: string;
  composer: string;
  famous_level: "WORLD" | "NATIONAL" | "RISING" | "NEWBEE";
};

type Props = {
  performances: PerformanceType[];
};

export default function PerformanceNewbeeList({ performances = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComposer, setSelectedComposer] = useState<string>("전체");

  const composers = [
    "전체",
    "쇼팽",
    "라흐마니노프",
    "쇼스타코비치",
    "브람스",
    "바흐",
    "베토벤",
    "드뷔시",
    "바그너",
    "생상스",
    "라벨",
    "리스트",
    "차이콥스키",
    "슈만",
    "비발디",
    "모차르트",
    "멘델스존",
  ];

  const filteredPerformances = performances
    // 1️⃣ 신예 연주자만
    .filter((p) => p.famous_level === "NEWBEE")
    // 2️⃣ 작곡가 + 검색 필터
    .filter((p) => {
      const matchesComposer =
        selectedComposer === "전체" || p.program.includes(selectedComposer);
      const matchesSearch =
        p.title.includes(searchTerm) || p.program.includes(searchTerm);
      return matchesComposer && matchesSearch;
    });

  return (
    <div className="bg-[#b99895] min-h-screen">
      <Navbar />

      <main className="max-w-[1400px] mx-auto pt-[100px] px-6 pb-20">
        <div className="bg-white/10 rounded-sm shadow-md overflow-hidden">
          {/* 1. 작곡가 필터 섹션 (2줄 그리드) */}
          <section className="bg-[#d9d9d9] p-6 border-b-[6px] border-[#b99895]">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-5xl mx-auto">
              {composers.map((composer) => (
                <button
                  key={composer}
                  onClick={() => setSelectedComposer(composer)}
                  className={`py-2 px-4 rounded-full text-[13px] border transition-all shadow-sm
                    ${
                      selectedComposer === composer
                        ? "bg-[#b99895] text-white border-transparent font-bold"
                        : "bg-white border-gray-400 text-gray-800 hover:bg-gray-100"
                    }`}
                >
                  {composer}
                </button>
              ))}
            </div>
          </section>

          {/* 2. 검색 바 섹션 */}
          <section className="p-4 flex justify-end">
            <div className="flex items-center bg-white border border-gray-400 rounded-sm overflow-hidden h-9">
              <div className="px-4 bg-[#e5d5d5] border-r border-gray-400 h-full flex items-center text-sm font-bold">
                검색
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 outline-none w-48 md:w-64 text-sm"
              />
              <button className="px-3 hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
          </section>

          {/* 3. 데이터 테이블 섹션 */}
          <section className="px-4 pb-10">
            <table className="w-full text-[14px] border-collapse">
              <thead>
                <tr className="bg-[#e5d5d5] border-y border-gray-400">
                  <th className="py-2 px-4 border-r border-gray-300 w-16">
                    번호
                  </th>
                  <th className="py-2 px-2 border-r border-gray-300">제목</th>
                  <th className="py-2 px- border-r border-gray-300">일시</th>
                  <th className="py-2 px-2 border-r border-gray-300">장소</th>
                  <th className="py-2 px-2 border-r border-gray-300">가격</th>
                  <th className="py-2 px-4">작곡가</th>
                </tr>
              </thead>
              <tbody className="bg-[#d9d9d9]">
                {filteredPerformances.length > 0 ? (
                  filteredPerformances.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                    >
                      <td className="py-3 px-2 text-center">{index + 1}</td>
                      <td className="py-3 px-10 text-center font-medium">
                        {item.title}
                      </td>
                      <td className="py-3 px-2 text-center whitespace-nowrap">
                        {item.date_start === item.date_finish
                          ? item.date_start
                          : `${item.date_start} ~ ${item.date_finish}`}
                      </td>
                      <td className="py-3 px-2 text-center">{item.location}</td>
                      <td className="py-3 px-2 text-center">{item.price}</td>
                      <td className="py-3 px-4 text-center">{item.composer}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="h-64 bg-[#d9d9d9]">
                    <td colSpan={6} className="text-center text-gray-500">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
                {/* 데이터가 적을 때 배경색 유지를 위한 여백 */}
                {filteredPerformances.length < 5 &&
                  filteredPerformances.length > 0 && (
                    <tr className="h-40 bg-[#d9d9d9]">
                      <td colSpan={6}></td>
                    </tr>
                  )}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}
