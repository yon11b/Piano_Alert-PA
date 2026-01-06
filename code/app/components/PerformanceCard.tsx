// props 타입 정의
export type PerformanceType = {
  id: number;
  title: string;
  date_start: string;
  date_finish: string;
  time: string;
  price: string;
  cast: string;
  poster: string;
};

type Props = {
  performance: PerformanceType;
};

export default function PerformanceCard({ performance }: { performance: any }) {
  return (
    // min-h-[220px] 정도로 높이를 키워서 화면을 더 많이 차지하게 설정했습니다.
    <div className="flex bg-[#E5E1E1] shadow-md w-full items-stretch overflow-hidden h-[180px]">
      {/* 1. 포스터 영역: 카드 크기에 맞춰 너비를 w-[180px]로 확장 */}
      <div className="w-[140px] flex-shrink-0 bg-gray-300">
        <img
          src={performance.poster}
          alt={performance.title}
          // h-full로 세로를 꽉 채우고 object-cover로 비율을 유지하며 채웁니다.
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. 정보 영역: 텍스트 크기를 키우고 여백을 더 줬습니다. */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-[17px] font-bold text-black mb-1 leading-[1.2] break-keep display-webkit-box webkit-line-clamp-2 webkit-box-orient-vertical overflow-hidden">
            {performance.title}
          </h2>

          {/* 상세 정보 텍스트 크기를 text-[15px]로 키움 */}
          <div className="grid grid-cols-[60px_1fr] gap-y-1 text-[14px] text-gray-700">
            <span className="font-bold">일자</span>
            <span className="text-gray-600">
              {performance.date_start === performance.date_finish
                ? `${performance.date_start} ${performance.time}`
                : `${performance.date_start} ~ ${performance.date_finish} ${performance.time}`}
            </span>

            <span className="font-bold">장소</span>
            <span className="text-gray-600">{performance.location}</span>

            <span className="font-bold">가격</span>
            <span className="text-gray-600">
              {performance.price || "가격 정보 없음"}
            </span>

            <span className="font-bold">출연</span>
            {/* line-clamp-3으로 출연진이 많아도 3줄까지는 보이게 설정 */}
            <span className="text-gray-600 line-clamp-3 leading-relaxed">
              {performance.cast || "출연진 정보 없음"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
