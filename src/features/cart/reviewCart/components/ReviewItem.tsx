import { CartItemTyp } from "@/src/features/type";

interface ReviewItemProps {
 item: CartItemTyp
}

export default function ReviewItem({item}: ReviewItemProps) {
  return (
    <div  className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200">
            {/* <ImageWithFallback
            src={it.product.images[0]?.url}
            alt={it.product.name}
            className="h-full w-full object-cover"
            /> */}
        </div>
        <div className="min-w-0">
            <p className="font-semibold text-neutral-900 truncate">
            {item.name}
            </p>
            <p className="text-neutral-500">
            {item.quantity} x {item.price}
            </p>
        </div>
        </div>

        <div className="font-bold text-neutral-900 text-right whitespace-nowrap">
         {item.total*item.quantity} 
        </div>
    </div>
  );
}