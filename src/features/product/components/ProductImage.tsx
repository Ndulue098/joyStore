import { ImageOff } from "lucide-react";

interface ProductImageProps {
  image:string | null | undefined;
  name:string;
}

export default function ProductImage({image,name}: ProductImageProps) {
  return (
    <div className="lg:col-span-5 w-full">
      <div className="relative aspect-square w-full rounded-2xl bg-neutral-100 border border-neutral-200/80 overflow-hidden shadow-xs flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-neutral-400 gap-2">
            <ImageOff className="h-10 w-10 stroke-[1.5] text-neutral-300" />
            <span className="text-xs font-medium text-neutral-400">
              No Image Available
            </span>
          </div>
        )}
      </div>
    </div>
  );
}