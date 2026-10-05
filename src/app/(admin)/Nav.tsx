"use client"

import { Layers, LayoutDashboard, ShoppingBag } from "lucide-react"
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
    label: "Orders & Quotations",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1.5 w-full">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={`flex items-center justify-center md:justify-start gap-3 px-2 md:px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full ${
              isActive
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-current" : "text-neutral-500"}`} />
            
            {/* Hidden on mobile viewports, shown on medium screens and up */}
            <span className="hidden md:inline truncate">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}