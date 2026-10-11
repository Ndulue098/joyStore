import { Layers, LayoutDashboard, LogOut, MoveLeft, Package, Shield, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Nav from "./Nav";
import { Metadata } from "next";
import { getAdminSession } from "@/src/app/(admin)/auth";
import { redirect } from "next/navigation";
import SignOutPage from "../(public)/logout/page";

interface layoutProps {
  children: React.ReactNode;
}


export const metadata: Metadata = {
  title: "Admin",
  description:"Create, delete, edit, and manage product and orders"
};



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




export default async function layout({children}: layoutProps) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-neutral-50/60 dark:bg-neutral-950">
{/* md:w-64  border-r border-neutral-200 dark:border-neutral-800 md:p-4 
      space-y-1 sticky top-0 md:h-screen shrink-0 flex md:flex-col justify-between transition-all duration-200 z-30
         flex-row-reverse
 */}
      <aside className="fixed  bottom-0 left-0 right-0 z-40 md:w-64 bg-white dark:bg-neutral-900 border-t
       md:border-t-0 md:border-r border-neutral-200 dark:border-neutral-800 px-3 py-2 md:p-4 md:sticky md:top-0 md:h-screen md:shrink-0 flex md:flex-col justify-between items-center
        md:items-stretch shadow-lg md:shadow-none transition-all duration-200 shrink-0">
        
        {/* Top Section: Branding & Navigation */}
        <div className="flex md:flex-col items-center md:items-stretch justify-between w-full md:space-y-6">
          
          {/* Header Branding (Hidden on mobile bottom bar to save space, visible in desktop sidebar) */}
          <div className="hidden md:block border-b border-neutral-200 dark:border-neutral-800 pb-3 text-center">
            <h1 className="font-extrabold text-xs tracking-wider uppercase text-neutral-900 dark:text-neutral-100">
              Admin Dashboard
            </h1>
          </div>

          {/* Section Label (Desktop Only) */}
          <div className="hidden md:block text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-1">
            Store Management
          </div>

          {/* Navigation Items */}
          <Nav /> 
        </div>

        {/* Bottom Section: Store & Auth Links (Hidden on mobile bar, shown on desktop sidebar) */}
        <div className="hidden md:block pt-4 border-t border-neutral-200/80 dark:border-neutral-800 space-y-1.5">
          <Link
            href="/shop"
            title="Back to store"
            className="flex items-center gap-3 w-full px-3 py-2.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all"
          >
            <span>Back to store</span>
          </Link>

          <Link
            href="/logout"
            title="Sign out"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all border border-neutral-200/60 dark:border-neutral-700/60"
          >
            <span>Sign out</span>
          </Link>
        </div>
        
      </aside>    

      {/* Main Content Area (Extra bottom padding on mobile so content isn't blocked by the bottom bar) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 max-w-7xl mx-auto w-full min-w-0 overflow-x-hidden">
        {children}
      </main>

    </div>
  ); 
}