import PerformanceCard from "@/app/components/PerformanceCard";
import db from "@/lib/performance";

export default async function PerformancesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/performances`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const performances = data.Response?.performance_list || [];

  return (
    <div>
      <h1>공연 목록</h1>
      {performances.map((p) => (
        <PerformanceCard key={p.id} performance={p} />
      ))}
    </div>
  );
}
