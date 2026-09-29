"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  FileSearch,
  Phone,
  MessageSquare,
  LayoutDashboard,
  User2,
} from "lucide-react";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import User from "./User";
import CartItem from "./CartItem";
import { Session } from "next-auth";


interface NavBarProps {
  session: Session | null;
}


export default function NavBar({session}:NavBarProps) {
 
  const router=useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      setMobileMenuOpen(false);
    }
    router.push(`/shop?search=${headerSearch.trim()}`)
    setHeaderSearch("")

  };


  

  return (
    <div
      className={`${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-xs border-b border-neutral-200/80 py-2.5"
          : "bg-white border-b border-neutral-200 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* LEFT: Brand Logo */}
        <div className="flex items-center shrink-0">
          <Logo />
        </div>

        {/* CENTER: Primary Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            Shop
          </Link>

          <Link
            href="/#how-it-works"
            className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            How It Works
          </Link>
        </div>

        {/* RIGHT: Search, Order Tracking & Cart */}
        <div className="flex items-center gap-3">
          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex relative w-52 lg:w-64"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search cables, switches..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="w-full rounded-xl bg-neutral-100/80 pl-9 pr-3 py-1.5 text-xs font-medium text-neutral-900 placeholder:text-neutral-400 border border-transparent focus:border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/5 transition-all"
              />
            </div>
          </form>

          {/* Order Lookup Button */}
          <Link
            href="/order/lookup"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 text-xs font-semibold transition-all shadow-2xs"
            title="Track existing order"
          >
            <FileSearch className="h-3.5 w-3.5 text-neutral-500" />
            <span className="hidden xl:inline">Track Order</span>
          </Link>

          <CartItem/>


          {session?.user ? (
            session.user.image ? (
              <div className="flex items-center gap-2 pb-1 border-b">
                <Link
                  href={"/admin"}
                  className="rounded-full overflow-hidden border border-neutral-200 shrink-0"
                >
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "Admin"}
                      className="w-7 h-7 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 bg-neutral-900 text-white font-bold text-xs flex items-center justify-center uppercase">
                      {session?.user?.name?.[0] || "A"}
                    </div>
                  )}
                </Link>

                <Link
                  href={"/api/auth/signout"}
                  className="text-neutral-600 hover:text-neutral-900 font-semibold text-xs"
                >
                  Sign Out
                </Link>
            </div>
            ) : (
              <div className="bg-neutral-100 p-2 rounded-full border border-neutral-200 text-neutral-600">
                <User2 className="w-4 h-4" />
              </div>
            )
          ) : (
            /* Optional: What to show when no admin is logged in */
            <Link href="/api/auth/signin" className="text-xs font-semibold text-neutral-600 hover:text-neutral-900">
              Sign In
            </Link>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 focus:outline-none transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200/80 bg-white px-4 pt-4 pb-6 mt-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products, cables, sockets..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="w-full rounded-xl bg-neutral-100/80 pl-10 pr-4 py-2.5 text-xs text-neutral-900 border border-neutral-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>
          </form>

          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              Shop Catalogue
            </Link>

            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              How Ordering Works
            </Link>

            <Link
              href="/order/lookup"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              <FileSearch className="h-4 w-4 text-amber-600" />
              <span>Track Order Reference</span>
            </Link>

            <div className="pt-3 mt-2 border-t border-neutral-100 flex flex-col space-y-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/80"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-600" />
                <span>Admin Portal</span>
              </Link>
              
              <div className="px-3 py-2 text-xs text-neutral-500 space-y-1.5 font-medium">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Call Us: +234 803 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
                  <span>WhatsApp Negotiation Available</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}