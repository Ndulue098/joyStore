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
    <div className="min-h-screen flex flex-row w-full bg-neutral-50/50 dark:bg-neutral-950 ">
      
      <aside className="w-12 md:w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 px-1 py-4 md:p-4 space-y-1 sticky top-0 h-screen shrink-0 flex flex-col justify-between transition-all duration-200 z-30">
        
        {/* Top Section */}
        <div className="space-y-6">
          
          {/* Header Branding */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 text-center">
            <h1 className="hidden md:block font-extrabold text-xs tracking-wider uppercase text-neutral-900 dark:text-neutral-100">
              Admin Dashboard
            </h1>
            <div className="flex md:hidden justify-center text-neutral-900 dark:text-neutral-100 py-0.5" title="Admin Dashboard">
              <Shield className="h-5 w-5 text-amber-600" />
            </div>
          </div>

          {/* Section Label */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 text-center md:text-left md:px-1">
            <span className="hidden md:inline">Store Management</span>
            <span className="md:hidden text-[10px] block text-center">• • •</span>
          </div>

          {/* Navigation Items */}
          <Nav /> 
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 space-y-1.5">
          <Link
            href="/shop"
            title="Back to store"
            className="flex items-center justify-center md:justify-start gap-3 w-full px-2 md:px-3 py-2.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all"
          >
            <MoveLeft className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline truncate">Back to store</span>
          </Link>

          <Link
            href="/logout"
            title="Sign out"
            className="flex items-center justify-center md:justify-start gap-3 w-full px-2 md:px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all border border-neutral-200/60 dark:border-neutral-700/60 group"
          >
            <LogOut className="h-4 w-4 text-neutral-500 group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <span className="hidden md:inline truncate">Sign out</span>
          </Link>
        </div>
        
      </aside>    

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-6 max-w-7xl mx-auto w-full min-w-0 overflow-x-hidden">
        {children}
      </main>

    </div>
  ); 
}