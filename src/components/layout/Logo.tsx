import { Zap } from "lucide-react";
import Link from "next/link";

export default function Logo({}) {
  return (
    <Link href="/" className="flex items-center gap-1 shrink-0 group">
        <div className="h-6 w-6 flex items-center justify-center text-brand ">
            <Zap className="h-5 w-5 text-brand" />
        </div>
        <div>
            <div className="flex items-center gap-1.5">
            <span className="font-extrabold uppercase text-lg sm:text-xl tracking-tight text-transparent]">
                Prowda
            </span>
            </div>
        </div>
    </Link>
  );
}