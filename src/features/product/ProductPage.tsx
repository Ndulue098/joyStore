import { StockBadge } from "@/src/ui/StockBadge";
import { CheckCircle2, Minus, Plus, ShoppingCart } from "lucide-react";
import { getProductById } from "./data/getProductById";
import RelatedProduct from "./components/RelatedProduct";

interface ProductPageProps {
  productId: string;
}


export default async function ProductPage({ productId }: ProductPageProps) {
    const product=await getProductById(productId)

    if(!product){
        return <h1>No Product Found</h1>
    }

  console.log(product)
    const {name,sku,brand,description,price,stock_quantity,stock_status,unit,specifications,category_id} = product || {}
    const secArray=Object.entries(specifications)


  return (
    <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-14 justify-center self-center border-b border-b-gray-300 pb-16"> 
            <div className="lg:col-span-5 flex flex-col gap-4  px-7">
            {/* Main Image Box */}
            <div className="w-full h-[450px] lg:h-[450px] ring-offset-8 ring aspect-square bg-neutral-100  overflow-hidden flex items-center justify-center border border-neutral-200">
                <img 
                src="https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80" 
                alt="Industrial Black Iron Cage Chandelier" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                />
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-5 gap-3">
                {[
                "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=200&q=80",
                ].map((src, index) => (
                <button 
                    key={index} 
                    className="h-20  overflow-hidden border border-neutral-200 hover:border-neutral-900 transition-all duration-200 focus:outline-none"
                >
                    <img 
                    src={src} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200" 
                    />
                </button>
                ))}
            </div>
            </div>

        {/* Right Column: Details & Ordering (6 cols on lg) */}
        <div className="lg:col-span-5  flex flex-col justify-between space-y-6">
            {/* brand */}
            <div className="flex items-center text-xs justify-between my-3 mb-1 ">
                <p className=" p-2 uppercase bg-red-200">{brand}</p>
                <p>SKU: <span>{sku}</span></p>
            </div>

            <h2 className="text-2xl font-bold p-2 border border-b text-center leading-[-2px] ">{name}</h2>
            {/* unit price */}
            {/* description */}
            <div className="my-2">
                <p className="text-xs text-neutral-700 font-semibold tracking-wide mb-2">Product Description</p>
                <p className="text-neutral-600 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
            
            <div className="flex items-center justify-between px-6 mb-4">
                <div className="flex gap-3.5 items-center rounded-md ">
                    <em className="text-xs font-semibold tracking-wide">Unit Price:</em>
                    <p className="font-bold text-2xl leading-[-2px]">₦{price}</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                    <label className="text-xs font-semibold text-neutral-700 mb-1.5">
                        Select Quantity:
                    </label>

                    <div className="border flex items-center justify-center gap-2 rounded-md">
                        <button className="p-2 border-r"><Plus className="w-5 h-5"/></button>
                        <span className="px-2">1</span>
                        <button className="p-2 border-l"><Minus className="w-5 h-5"/></button>
                    </div>
                    </div>
                </div>
            </div>

            <button className="w-full p-3 bg-neutral-900 flex items-center justify-center gap-2 text-gray-100 mb-4">
               <ShoppingCart className="w-5 h-5 "/> <span>Add to Cart</span>
            </button>

            <div className="">
                <p className="uppercase text-sm ">specification</p>
                <div className="border-b border-b-gray-400 my-2"></div>
                <div className="flex flex-col text-sm font-semibold "> 
                    {secArray.map((valArr,i)=>{
                        const [a,b]=valArr
                       return <div key={i} className={`${(i+1)%2===0?"bg-gray-200":"bg-gray-100"} flex gap-10 items-center justify-between p-4 py-2 text-neutral-500`}>
                        <p>{a}</p>
                        <p>{b}</p>
                    </div>
                    })}
                </div>
            </div>
  


        </div>
      </div>

       <RelatedProduct category_id={category_id} productId={productId}/>             

    </div>
  );
}