import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReviewCartForm from "./components/ReviewCartForm";
import ReviewProduct from "./components/ReviewProduct";
import ReviewLayout from "./components/ReviewLayout";


export default function ReviewCartPage({}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <Link
            href="/cart"
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Order Review & Customer Details
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Provide your contact info so we can generate your quotation and prepare for WhatsApp negotiation
          </p>
        </div>
      </div>
       <ReviewLayout/>
    </div>
  );
}