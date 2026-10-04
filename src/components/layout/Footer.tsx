import { Zap, Phone, MessageSquare, MapPin, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  
}

export default function Footer({}: FooterProps) {
  return (
   <footer
      id="store-contact"
      className="relative z-20 bg-neutral-200 dark:bg-neutral-900 rounded-tl-3xl sm:rounded-tl-4xl rounded-tr-3xl sm:rounded-tr-4xl text-neutral-700 dark:text-neutral-300 pt-12 sm:pt-16 pb-16 sm:pb-20 border-t border-neutral-300 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 border-b border-neutral-300 dark:border-neutral-800">
          
          {/* Col 1: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="h-7 w-7 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Zap className="h-5 w-5 fill-amber-500 text-amber-500" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-neutral-100">
                  JOY<span className="text-amber-500">STORE</span>
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed font-normal">
              The modern electrical appliance and supplies marketplace for Nigeria. Browse certified electrical stock, build your project order, and negotiate final bulk prices directly.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Browse. Select. Negotiate.</span>
            </div>
          </div>

          {/* Col 2: Store Links */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Store Catalogue
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <Link
                  href="/shop"
                  className="text-neutral-600 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer & Help */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Customer Help
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-neutral-600 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors"
                >
                  How Ordering Works
                </Link>
              </li>
              <li>
                <Link
                  href="/order/lookup"
                  className="text-neutral-600 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors flex items-center justify-center md:justify-start gap-1"
                >
                  <span>Track Order</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-neutral-600 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors"
                >
                  Review Order Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-neutral-600 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors"
                >
                  Store Owner Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium text-center md:text-left">
              <div className="flex items-start justify-center md:justify-start gap-2">
                <MapPin className="h-4 w-4 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5" />
                <span>5 Oshodi Street</span>
              </div>
              <div className="flex items-center justify-center md:justify-start  gap-2">
                <Phone className="h-4 w-4 text-neutral-800 dark:text-neutral-200 shrink-0" />
                <span>801 xxx xxx xxx</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>WhatsApp: 801 xxx xxx xxx</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Clock className="h-4 w-4 text-neutral-800 dark:text-neutral-200 shrink-0" />
                <span>8:00 AM - 6:00 PM (Mon-Sun)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          <p>© {new Date().getFullYear()} VoltDirect Electrical Supplies. All rights reserved.</p>
          <span className="font-mono text-base font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_#f59e0b]">
            Ndulue Christian
          </span>
        </div>
      </div>
    </footer>
  );
}