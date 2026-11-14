import { Zap } from "lucide-react";
import Link from "next/link";

export default function Logo({}) {
  return (
    <Link href="/" className="flex items-center shrink-0 group">
  <div className="flex flex-col items-center">
    <div className="flex items-center">
      <div className="h-6 w-6 flex items-center justify-center text-brand">
        <Zap className="h-5 w-5 text-brand" />
      </div>
      <div>
        <span className="font-extrabold uppercase text-lg sm:text-xl tracking-tight leading-[-14px] text-neutral-950 ">
          Prowda
        </span>
      </div>
    </div>
    <span className="text-[10px] font-bold tracking-widest text-neutral-700 block leading-none">
      GLOBAL
    </span>
  </div>
</Link>
  );
}