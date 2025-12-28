import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#3e3432] text-white z-50 shadow-md">
      <div className="max-w-[1300px] mx-auto py-3">
        {/* 상단 */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-bold tracking-tighter">
              세상 모든 피아노공연 알리미
            </h1>
            <span className="text-red-600 font-bold text-lg italic">PPA</span>
          </div>

          <div className="flex gap-4 text-xs opacity-80">
            <span>백하연 님, 환영합니다</span>
            <button className="hover:underline">로그아웃</button>
          </div>
        </div>

        {/* 메뉴 */}
        <nav className="border-t border-white/20 pt-3">
          <div className="flex justify-center gap-32">
            <Link
              href="/performances-star"
              className="text-[20px] font-extrabold hover:text-gray-300 transition-colors tracking-tight"
            >
              공연목록
            </Link>

            <Link
              href="/performances-new"
              className="text-[20px] font-extrabold hover:text-gray-300 transition-colors tracking-tight"
            >
              신예연주자
            </Link>

            <Link
              href="/seats"
              className="text-[20px] font-extrabold hover:text-gray-300 transition-colors tracking-tight"
            >
              좌석선호도
            </Link>

            <Link
              href="/community"
              className="text-[20px] font-extrabold hover:text-gray-300 transition-colors tracking-tight"
            >
              커뮤니티
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
