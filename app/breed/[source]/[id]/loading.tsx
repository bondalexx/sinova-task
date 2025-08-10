export default function BreedLoading() {
  return (
    <div className="space-y-6">
      <div className="h-7 w-64 rounded bg-gray-200" />
      <div className="aspect-[16/9] w-full rounded-lg bg-gray-200" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="h-5 w-40 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-md bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
