import { ShieldCheck, Tag, MessageSquare, ShoppingBag, CheckCircle2 } from 'lucide-react';

interface ShopwithUsProps {
  title:string;
  description:string;
  icon: React.ReactNode;
}

const TRUST_PILLARS: ShopwithUsProps[] = [
  {
    icon: <ShieldCheck className="h-4 w-4 text-amber-500" />,
    title: 'Quality Products',
    description:
      'Carefully selected electrical products from verified manufacturers for everyday residential and commercial projects.',
  },
  {
    icon: <Tag className="h-4 w-4 text-amber-500" />,
    title: 'Transparent Listed Prices',
    description:
      'See the current listed price before starting your negotiation, giving you a clear benchmark for project budgeting.',
  },
  {
    icon: <MessageSquare className="h-4 w-4 text-emerald-500" />,
    title: 'Direct Negotiation',
    description:
      'Talk directly with us and negotiate your order through WhatsApp. Get personalized contractor discounts and package deals.',
  },
  {
    icon: <ShoppingBag className="h-4 w-4 text-blue-500" />,
    title: 'Easy Order Building',
    description:
      'Select multiple products in one structured order instead of sending messy product photos and random voice notes one by one.',
  },
];

export default function ShopwithUs() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-10 sm:py-16"
      aria-labelledby="why-shop-heading"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2
          id="why-shop-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight"
        >
          Why Shop With Us?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-medium leading-relaxed">
          Designed specifically for how contractors, electricians, and homeowners buy electrical materials in Nigeria.
        </p>
      </div>

      {/* Grid Layout with Stacking Protection */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {TRUST_PILLARS.map((item, index) => (
          <div
            key={index}
            className="group relative z-10 max-w-80 mx-auto sm:max-w-full rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 hover:border-amber-400/80 dark:hover:border-amber-500/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Icon Badge */}
              <div className="h-9 w-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/60 border border-neutral-200 dark:border-neutral-700 group-hover:border-amber-200 dark:group-hover:border-amber-800/80 flex items-center justify-center transition-colors mb-4">
                <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {item.icon}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Footer Tag */}
            <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              <span>VoltDirect Standard</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}