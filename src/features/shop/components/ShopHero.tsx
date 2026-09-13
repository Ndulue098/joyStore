interface ShopHeroProps {
  
}

export default function ShopHero({}: ShopHeroProps) {
  return (
      <div className="rounded-md bg-neutral-900 text-white p-6 sm:p-8 relative overflow-hidden border border-neutral-800 shadow-xl">
    {/* Subtle Background Glow Accent */}
    <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10 max-w-2xl space-y-2">
      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
        Store Inventory
      </span>
      <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
        Electrical Supplies & Appliances
      </h1>
      <p className="text-sm text-neutral-400 leading-relaxed">
        Browse genuine electrical products, wires, sockets, lighting, and industrial accessories. Add to your order list and negotiate bulk prices.
      </p>
    </div>
  </div>
  );
}