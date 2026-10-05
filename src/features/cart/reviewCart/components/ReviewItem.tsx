import { CartItemTyp } from "@/src/features/type";
import { CartType } from "@/src/types/types";
import { ImageOff } from "lucide-react";

interface ReviewItemProps {
 item: CartType
}

export default function ReviewItem({item}: ReviewItemProps) {
  return (
    <div  className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
        <div className="sm:h-12 sm:w-12 h-8 w-8 shrink-0 overflow-hidden rounded-sm md:rounded-lg bg-neutral-100 border border-neutral-200">
             {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-full w-full  object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <ImageOff className="h-full w-full  stroke-[1.5] text-neutral-300" />
          )}
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