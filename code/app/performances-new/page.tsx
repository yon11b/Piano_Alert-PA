import PerformanceNewbeeList from "@/app/components/PerformanceNewbeeList";
import db from "@/lib/performance";

export default async function PerformancesPage() {
  const params = new URLSearchParams({
    famous: "newbee",
  });
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/performances?${params.toString()}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const performances = data.Response?.performance_list || [];

  return (
    <main>
      <PerformanceNewbeeList performances={performances} />
    </main>
  );
}
