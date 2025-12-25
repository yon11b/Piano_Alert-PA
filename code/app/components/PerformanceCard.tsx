type Props = {
  performance: PerformanceType;
};

export default function PerformanceCard({ performance }: Props) {
  return (
    <div className="card">
      <h2>{performance.title}</h2>
      <p>{performance.genre}</p>
      <p>{performance.location}</p>
    </div>
  );
}
