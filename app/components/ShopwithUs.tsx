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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" aria-labelledby="why-shop-heading">
      <div className="text-center max-w-xl mx-auto mb-10">
        
        <h2 id="why-shop-heading" className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
          Why Shop With Us?
        </h2>
        <p className="text-xs sm:text-sm  text-neutral-500 mt-1">
          Designed specifically for how contractors, electricians, and homeowners buy electrical materials in Nigeria.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRUST_PILLARS.map((item, index) => (
          <div
            key={index}
            className="rounded-md bg-white border border-neutral-200/80 p-6 hover:border-amber-300 transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="h-7 w-7 rounded-md bg-neutral-100 group-hover:bg-amber-50 border border-neutral-200 group-hover:border-amber-200 flex items-center justify-center transition-colors mb-3">
                {item.icon}
              </div>
              <h3 className="text-base font-extrabold text-neutral-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-neutral-100 flex items-center gap-1 text-[11px] font-semibold text-neutral-400 group-hover:text-amber-700 transition-colors">
              <span>VoltDirect Standard</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}