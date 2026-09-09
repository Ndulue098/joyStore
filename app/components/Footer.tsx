import { Zap, Phone, MessageSquare, MapPin, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  
}

export default function Footer({}: FooterProps) {
  return (
   <footer id="store-contact" className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Col 1: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-6 w-6 flex items-center justify-center text-brand ">
                    <Zap className="h-5 w-5 fill-brand text-brand" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  JOY<span className="text-brand">STORE</span>
                </span>
              </div>
            </Link>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              The modern electrical appliance and supplies marketplace for Nigeria. Browse certified electrical stock, build your project order, and negotiate final bulk prices directly.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Browse. Select. Negotiate.</span>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Verified Pure Copper & Certified NIS Standards
              </span>
            </div>
          </div>

          {/* Col 2: Store Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Store Catalogue</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="text-neutral-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop/bulbs" className="text-neutral-400 hover:text-white transition-colors">
                  LED Bulbs & Lamps
                </Link>
              </li>
              <li>
                <Link href="/shop/cables-wires" className="text-neutral-400 hover:text-white transition-colors">
                  Pure Copper Cables
                </Link>
              </li>
              <li>
                <Link href="/shop/switches-sockets" className="text-neutral-400 hover:text-white transition-colors">
                  Switches & Sockets
                </Link>
              </li>
              <li>
                <Link href="/shop/fans" className="text-neutral-400 hover:text-white transition-colors">
                  Ceiling & Standing Fans
                </Link>
              </li>
              <li>
                <Link href="/shop/chandeliers" className="text-neutral-400 hover:text-white transition-colors">
                  Pendant Chandeliers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer & Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Customer Help</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-neutral-400 hover:text-white transition-colors">
                  How Ordering Works
                </Link>
              </li>
              <li>
                <Link href="/order/lookup" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                  Track Order
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-neutral-400 hover:text-white transition-colors">
                  Review Order Cart
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-neutral-400 hover:text-amber-400 transition-colors">
                  Store Owner Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Contact</h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>5 oshodi street</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span>801 xxx xxx xxx</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: 801 xxx xxx xxx</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span>8:00 AM - 6:00 PM (Mon-Sun)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} VoltDirect Electrical Supplies. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
}