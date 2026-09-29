import { Layers, LayoutDashboard, LogOut, Package, ShoppingBag } from "lucide-react";
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
    <div className="flex-1 flex flex-col md:flex-row items-start">
      <div className="w-full md:w-64 bg-white border-r border-neutral-200 p-4 space-y-1 sticky top-0 h-screen shrink-0 flex flex-col justify-between">
        {/* Admin Sidebar */}
        <aside className="">
          <h1 className="text-center font-bold text-xl border-b border-neutral-300 mb-6 pb-1"> ADMIN DASHBOARD</h1>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Store Management
          </div>

          <Nav/>
        </aside>

        <div className="pt-4 border-t border-neutral-100 mt-6">
          <Link
            href="/logout"
            className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-md text-xs font-semibold text-neutral-700 bg-neutral-100/80 hover:bg-neutral-200/60 hover:text-neutral-900 transition-all border border-neutral-200/50 group"
          >
            <LogOut className="h-3.5 w-3.5 text-neutral-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Sign out</span>
          </Link>
        </div>
        
      </div>    

  {/* Admin Page Content */}
  <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
    {children}
  </main>
</div>
  ); 
}