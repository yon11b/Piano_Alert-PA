export default function Navbar() {
  return (
    // 상단 및 양옆 완전 밀착
    <header className="fixed top-0 left-0 w-full bg-[#3e3432] text-white z-50 shadow-md">
      {/* px-4로 줄여서 제목이 왼쪽 끝에 더 붙도록 설정 */}
      <div className="max-w-[1300px] mx-auto py-3">
        {/* 1. 상단 섹션: 제목을 왼쪽으로 최대한 붙임 */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-baseline gap-2">
            {/* tracking-tighter로 자간을 좁혀 더 밀착된 느낌 부여 */}
            <h1 className="text-2xl font-bold border-white pb-0.5 tracking-tighter">
              세상의 모든 피아노공연 알리미
            </h1>
            <span className="text-red-600 font-bold text-lg italic">PPA</span>
          </div>

          <div className="flex gap-4 text-xs opacity-80">
            <span>백하연 님, 환영합니다</span>
            <button className="hover:underline">로그아웃</button>
          </div>
        </div>

        {/* 2. 메뉴 섹션: 중앙 정렬 및 글씨 크기 확대 */}
        <nav className="border-t border-white/20 pt-3">
          <div className="flex justify-center gap-32">
            {["공연목록", "장르선택", "좌석선호도", "커뮤니티"].map((m) => (
              <button
                key={m}
                className="text-[20px] font-extrabold hover:text-gray-300 transition-colors tracking-tight"
              >
                {m}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
