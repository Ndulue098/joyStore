"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductBtnProps {
  slug: string;
  name: string;
}

export default function ProductBtn({ slug, name }: ProductBtnProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category") || "all";
  const isActive = currentCategory === slug;

  function handleSelect(filter: string) {
    const params = new URLSearchParams(searchParams);
    if (filter === "all") {
      params.delete("category");
    } else {
      params.set("category", filter);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <button
      type="button"
      onClick={() => handleSelect(slug)}
      className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
        isActive
          ? "bg-neutral-900 text-white shadow-xs"
          : "bg-white border border-neutral-200/80 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
      }`}
    >
      {name}
    </button>
  );
}