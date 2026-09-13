import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title:string;
  description:string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export default function EmptyState({title,description,icon,actionLabel,onAction,className}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-neutral-300 bg-white/70 max-w-lg mx-auto ${className}`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 mb-4">
        {icon || <PackageOpen className="h-8 w-8 text-neutral-400" />}
      </div>
      <h3 className="text-lg font-bold text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-600 mb-6 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <button>
          {actionLabel}
        </button>
      )}
    </div>
  );
}