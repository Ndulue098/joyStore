import { Zap } from "lucide-react";
import Link from "next/link";

export default function Logo({}) {
  return (
    <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
        <div className="h-6 w-6 flex items-center justify-center text-brand ">
            <Zap className="h-5 w-5 fill-brand text-brand" />
        </div>
        <div>
            <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-neutral-900">
                JOY<span className="text-brand">STORE</span>
            </span>
            </div>
        </div>
    </Link>
  );
}