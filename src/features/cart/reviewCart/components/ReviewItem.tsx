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
        <div className="sm:h-12 sm:w-12 h-8 w-8 shrink-0 overflow-hidden rounded-xs md:rounded-lg bg-neutral-100 border border-neutral-200">
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

        <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2">

          {item.brand && (
            <span className="flex items-center gap-1 font-bold text-neutral-400 tracking-wider uppercase text-[9px] truncate">
              brand:  
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
              {item.brand}
            </span>
            </span>
          )} 
          <span className="flex items-center gap-1 font-bold text-neutral-400 tracking-wider uppercase text-[9px] truncate">
              class:
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                {item.class_name || "Generic"}
              </span>
          </span>
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
        </div> 

        <div className="font-bold text-neutral-900 text-right whitespace-nowrap">
         ₦{Number(item.total * item.quantity).toLocaleString()}
        </div>
    </div>
  );
}