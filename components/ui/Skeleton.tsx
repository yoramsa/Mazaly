export function CardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-3xl border border-marine/[0.07] bg-surface shadow-soft">
      <div className="skeleton aspect-[16/10] w-full" />
      <div className="space-y-2.5 p-4">
        <div className="skeleton h-4 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-full rounded-full" />
        <div className="skeleton h-3 w-2/3 rounded-full" />
      </div>
    </div>
  )
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
