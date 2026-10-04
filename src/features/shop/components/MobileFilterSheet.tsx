"use client"

import { useState, ReactNode } from "react"
import Link from "next/link"
import { SlidersHorizontal, RotateCcw } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartContext } from "../../context/CartContext"

export default function MobileFilterSheet({ children }: { children: ReactNode }) {
  // const [open, setOpen] = useState(false)
  const {open,setOpen}=useCartContext()

  const handleFilterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Closes the sheet whenever any interactive filter element (links, buttons, inputs) is clicked
    const target = e.target as HTMLElement
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest("input[type='checkbox']") ||
      target.closest("input[type='radio']")
    ) {
      setOpen(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Side Tab Floating Trigger Button */}
      <SheetTrigger>
        <span>

        <button
          type="button"
          aria-label="Open Filter Catalogue"
          className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 py-3 px-2 rounded-r-xl shadow-lg cursor-pointer flex items-center gap-1 border border-l-0 border-neutral-700 dark:border-neutral-300 hover:pr-3 transition-all"
          >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
        </span>
      </SheetTrigger>

      {/* Slide-over Content Drawer */}
      <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0 flex flex-col  bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
        <SheetHeader className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            Filter Catalogue
          </SheetTitle>
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="text-xs font-semibold text-neutral-500 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors pr-6"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </Link>
        </SheetHeader>

        {/* Filter Content Body (Auto-closes on option click) */}
        <div className="p-5 overflow-y-auto flex-1 h-full min-h-0 ">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}