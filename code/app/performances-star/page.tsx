import PerformanceList from "@/app/components/PerformanceList";
import db from "@/lib/performance";

export default async function PerformancesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/performances`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const performances = data.Response?.performance_list || [];

  return (
    <main>
      <PerformanceList performances={performances} />
    </main>
  );
}
