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
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-xs border-b border-neutral-200/80 dark:border-neutral-800 py-2.5"
          : "bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* LEFT: Brand Logo */}
        <div className="flex items-center shrink-0">
          <Logo />
        </div>

        {/* CENTER: Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Shop
          </Link>

          <Link
            href="/#how-it-works"
            className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            How It Works
          </Link>
        </nav>

        {/* RIGHT: Search, Order Tracking & Cart */}
        <div className="flex items-center gap-3">
          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex relative w-52 lg:w-64"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search cables, switches..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 pl-9 pr-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 border border-transparent focus:border-amber-500/80 focus:bg-white dark:focus:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>
          </form>

          {/* Order Lookup Button */}
          <Link
            href="/order/lookup"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 text-xs font-semibold transition-all shadow-2xs"
            title="Track existing order"
          >
            <FileSearch className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="hidden xl:inline">Track Order</span>
          </Link>

          {/* Cart Component */}
          <CartItem />

          {/* Auth State */}
          {session?.user ? (
            session.user.image ? (
              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  href="/admin"
                  className="rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700 shrink-0 hover:ring-2 hover:ring-amber-500/50 transition-all"
                >
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Admin"}
                    className="w-7 h-7 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </Link>

                <Link
                  href="/api/auth/signout"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 font-semibold text-xs transition-colors"
                >
                  Sign Out
                </Link>
              </div>
            ) : (
              <Link
                href="/admin"
                className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <User2 className="w-4 h-4" />
              </Link>
            )
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors px-1 py-1"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t rounded-b-2xl border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 pt-4 pb-6 mt-2.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products, cables, sockets..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 pl-10 pr-4 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </form>

          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Shop Catalogue
            </Link>

            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              How Ordering Works
            </Link>

            <Link
              href="/order/lookup"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <FileSearch className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Track Order Reference</span>
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}