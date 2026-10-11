"use client"

import { Layers, LayoutDashboard, LogOut, MoveLeft, ShoppingBag } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  {
    id: "dashboard",
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    id: "categories",
    label: "Categories",
    href: "/admin/categories",
    icon: Layers,
  },
  {
    id: "orders",
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex md:flex-col flex-row items-center justify-around md:justify-start w-full gap-1 md:gap-1.5">
      
      {/* Mobile-only Back to Store Link */}
      <Link
        href="/shop"
        title="Back to store"
        className="flex md:hidden flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl text-[10px] font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all w-full"
      >
        <MoveLeft className="h-5 w-5 shrink-0 text-neutral-400" />
        <span className="truncate">Store</span>
      </Link>

      {/* Main Navigation Items */}
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 py-2 md:rounded-lg rounded-xl text-[10px] md:text-xs font-semibold transition-all w-full ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400 md:bg-neutral-950 md:text-white dark:md:bg-neutral-100 dark:md:text-neutral-900 shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            <Icon className={`h-5 w-5 md:h-4 md:w-4 shrink-0 ${isActive ? "text-indigo-600 md:text-current" : "text-neutral-400"}`} />
            
            <span className="truncate">{item.label}</span>
          </Link>
        )
      })}

      {/* Mobile-only Sign Out Link */}
      <Link
        href="/logout"
        title="Sign out"
        className="flex md:hidden flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl text-[10px] font-semibold text-neutral-500 hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all w-full"
      >
        <LogOut className="h-5 w-5 shrink-0 text-neutral-400" />
        <span className="truncate">Sign out</span>
      </Link>
    </nav>
  )
}