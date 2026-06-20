type Props = { lines?: number; className?: string };

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-white/[0.04] animate-pulse ${className}`} />
  );
}

export default function LoadingCard({ lines = 3, className = "" }: Props) {
  return (
    <div className={`rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 space-y-3 ${className}`}>
      <Skeleton className="h-4 w-2/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3 ${i === lines - 1 ? "w-1/2" : "w-full"}`} />
      ))}
    </div>
  );
}

export function LoadingGrid({ count = 3, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => <LoadingCard key={i} />)}
    </div>
  );
}
