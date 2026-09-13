"use client"
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  ShoppingCart,
  Menu,
  X,
  Search,
  FileSearch,
  ShieldCheck,
  ChevronDown,
  Layers,
  ArrowRight,
  Phone,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
} from 'lucide-react';


interface NavBarProps {
  
}


export default function NavBar({}: NavBarProps) {

//  const { itemCount, subtotal } = useCart();
//   const { categories, getProductsByCategoryId } = useProducts();
//   const activeCategories = categories.filter((c) => c.isActive);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-textWhite/80 py-2.5'
            : 'bg-white border-b border-textWhite py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* LEFT: Logo & Store Name */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
            <div className="h-6 w-6 flex items-center justify-center text-brand ">
              <Zap className="h-5 w-5 fill-brand text-brand" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-neutral-900">
                  JOY<span className="text-brand">STORE</span>
                </span>
              </div>
            </div>
          </Link>

          {/* CENTER: Navigation Links with Mega Menu */}
          {/* //! Nav bar -------------// */}
        <div className="hidden lg:flex items-center gap-6">
            
            <Link
              href="/"
              className="text-sm font-semibold text-textPry hover:text-textPry-H transition-colors"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="text-sm font-semibold text-textPry hover:text-textPry-H transition-colors"
            >
              Shop
            </Link>

            {/* Categories Dropdown / Mega-Menu */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors cursor-pointer ${
                  categoriesDropdownOpen ? 'text-brand' : 'text-textPry hover:text-textPry-H'
                }`}
                aria-expanded={categoriesDropdownOpen}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    categoriesDropdownOpen ? 'rotate-180 text-brand' : 'text-neutral-400'
                  }`}
                />
              </button>

              {/* Mega-Menu Dropdown Panel */}

              {/* {categoriesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] rounded-2xl bg-white border border-textPry shadow-xl p-5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-textPry">
                        All Electrical Departments (x)
                      </span>
                    </div>
                    <Link
                      href="/shop"
                      onClick={() => setCategoriesDropdownOpen(false)}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <span>Explore Full Catalogue</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                    {activeCategories.map((cat) => {
                      const count = getProductsByCategoryId(cat.id).length;

                      return (
                        <Link
                          key={cat.id}
                          href={`/shop/${cat.slug}`}
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition-all group"
                        >
                          <div className="h-11 w-11 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                            <ImageWithFallback
                              src={cat.imageUrl}
                              alt={cat.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-700 transition-colors truncate">
                                {cat.name}
                              </h4>
                              <span className="text-[10px] font-mono text-neutral-400 ml-2">
                                {count}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                              {cat.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )} */}
            </div>

            <Link
              href="/#how-it-works"
              className="text-sm font-semibold text-textPry hover:text-textPry-H transition-colors"
            >
              How It Works
            </Link>

           
          </div>

          {/* RIGHT: Search Bar, Cart/Order, Order Lookup & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex relative w-60 lg:w-72"
            >
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search cables, switches, bulbs..."
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  className="w-full rounded-md bg-neutral-100 pl-9 pr-4 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-500 border border-transparent focus:border-neutral-300 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </form>

            {/* Order Lookup Button */}
            <Link
              href="/order/lookup"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-textPry text-xs font-semibold transition-colors"
              title="Track existing order"
            >
              <FileSearch className="h-3.5 w-3.5 text-neutral-500" />
              <span className="hidden xl:inline">Find Order</span>
            </Link>

            {/* Cart / "Your Order" Button with Live Count */}
            <Link
              href="/cart"
              id="header-cart-button"
              className="relative flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3.5 py-1.5 text-neutral-900 shadow-2xs hover:bg-neutral-50 hover:border-neutral-400 transition-colors"
              aria-label={`Your Order with ${3} items`}
            >
              <ShoppingCart className="h-4 w-4 text-textPry" />
              <span className="text-xs font-bold hidden sm:inline">Your Order</span>
              <span
                className={`inline-flex items-center justify-center rounded-md text-xs font-bold transition-all ${
                  2 > 0
                    ? 'h-5 w-5 bg-brand text-textWhite shadow-2xs font-mono'
                    : 'h-5 px-1.5 text-neutral-500 bg-neutral-100 font-mono'
                }`}
              >
                {2}
              </span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-textPry hover:bg-neutral-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      {/* //! Nav bar -------------// */}
      {/* //! Nav bar -------------// */}


        {/* Polished Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-4 pb-6 mt-3 shadow-xl animate-in slide-in-from-top duration-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search bulbs, pure copper cables, sockets..."
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  className="w-full rounded-md bg-neutral-100 pl-10 pr-4 py-2.5 text-sm text-neutral-900 border border-neutral-200 focus:bg-white focus:outline-none"
                />
              </div>
            </form>

            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                Shop All Catalogue
              </Link>

              {/* Mobile Expandable Categories Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-brand" />
                    {/* <span>Categories ({activeCategories.length})</span> */}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform ${
                      mobileCategoriesOpen ? 'rotate-180 text-brand' : ''
                    }`}
                  />
                </button>

                {/* {mobileCategoriesOpen && (
                  <div className="pl-4 pr-1 py-2 space-y-1 bg-neutral-50 rounded-xl my-1 border border-neutral-100 max-h-56 overflow-y-auto">
                    {activeCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop/${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-textPry hover:text-amber-700 hover:bg-white rounded-lg transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {getProductsByCategoryId(cat.id).length} items
                        </span>
                      </Link>
                    ))}
                  </div>
                )} */}
              </div>

              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                How Ordering Works
              </Link>

              <Link
                href="/order/lookup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                <FileSearch className="h-4 w-4 text-brand" />
                <span>Track Order Reference</span>
              </Link>

              <div className="pt-3 border-t border-neutral-100 flex flex-col space-y-2">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Store Owner Admin Portal</span>
                </Link>
                <div className="px-3 py-2 text-xs text-neutral-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-neutral-400" />
                    <span>Call: </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
                    <span>WhatsApp: </span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </nav>
  );
}