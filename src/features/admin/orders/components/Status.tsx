interface StatusProps {
  order:string
}

const statusStyles: Record<string, string> = {
  draft: "bg-amber-50 text-amber-700 border-amber-200/60",
  pending: "bg-blue-50 text-blue-700 border-blue-200/60",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200/60",
};

const statusDotStyles: Record<string, string> = {
  draft: "bg-amber-500",
  pending: "bg-blue-500",
  completed: "bg-emerald-500",
  cancelled: "bg-rose-500",
};

export default function Status({order}: StatusProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusStyles[order] || statusStyles.draft}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[order] || statusDotStyles.draft}`} />
      <span className="capitalize">{order}</span>
  </span>
  );
}