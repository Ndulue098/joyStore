"use client"
import { Layers, LayoutDashboard, Package, ShoppingBag } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const navItems = [
    {
      id: 'dashboard',
      label: 'Overview',
      href: '/admin',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    // {
    //   id: 'products',
    //   label: 'Products',
    //   href: '/admin/products',
    //   icon: <Package className="h-4 w-4" />,
    // },
    {
      id: 'categories',
      label: 'Categories',
      href: '/admin/categories',
      icon: <Layers className="h-4 w-4" />,
    },
    {
      id: 'orders',
      label: 'Orders & Quotations',
      href: '/admin/orders',
      icon: <ShoppingBag className="h-4 w-4" />,
    },
  ];

export default function Nav() {

  const pathname = usePathname(); // e.g., "/admin"
  console.log(pathname);
  
  console.log("/admin"===pathname);
    

  return (
    <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 
            ${item.href===pathname?"bg-neutral-200":""}
            `}
        >
          <span className="text-neutral-400">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}