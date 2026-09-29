import { CheckCircle2, Clock3, XCircle } from "lucide-react";

export function getStatusBadge(status?: string) {
  const normalized = status?.toLowerCase() || "pending";
  switch (normalized) {
    case "completed":
    case "confirmed":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" />
          {status}
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <XCircle className="w-3 h-3" />
          {status}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
          <Clock3 className="w-3 h-3 text-amber-600" />
          {status || "Pending"}
        </span>
      );
  }
}