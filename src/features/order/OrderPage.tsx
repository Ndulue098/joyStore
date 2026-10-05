import Link from "next/link";
import Logo from "@/src/components/layout/Logo";
import { 
  CalendarCheck, 
  NotebookPen, 
  Phone, 
  User, 
  Clock, 
  MessageCircle, 
  ArrowLeft, 
} from "lucide-react";
import { getOrderById } from "./data/getOrderByid";
import TableRow from "./components/TableRow";
import { formatPickupDate } from "../lib/formatPickupDate";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";
import { getStatusBadge } from "../lib/getStatusBadge";

export default async function OrderPage({ orderId }: { orderId: string }) {
  const response = await getOrderById(orderId) ;
  const order=response?.data

  
  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-neutral-900">Quotation Not Found</h2>
        <p className="text-sm text-neutral-500">
          We couldn&apos;t find an order with reference code <strong className="font-mono">{orderId}</strong>.
        </p>
        <Link 
          href="/lookup"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Order Tracking
        </Link>
      </div>
    );
  }

  const {
    public_code,
    customer_name,
    customer_phone,
    pickup_date,
    notes,
    estimated_total,
    status,
    created_at,
    order_items,
    agreed_total,
    discountnumber
  } = order;

  const [pickupTimeSlot = "", orderNote = ""] = notes ? notes.split("|") : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
      
      {/* Navigation & Action Bar (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 print:hidden">
        <CustomBreadcrumbs 
          items={[
            { label: "Shop", href: "/shop" },
            { label: "Order Tracking", href: "/lookup" },
            { label: public_code || orderId, href: `#` }
          ]} 
        />

        <Link
          href="/lookup"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Look up another order</span>
        </Link>
      </div>

      {/* Main Quotation Paper Layout */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80  rounded-2xl p-4 sm:p-8 md:p-10 shadow-2xs space-y-6 sm:space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Header: Logo + Quotation Reference */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-neutral-200/80 ">
          {/* LEFT: Store branding & location */}
          <div className="space-y-3">
            <Logo />
            <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm space-y-1">
              <p className="font-medium text-neutral-700 dark:text-neutral-300">
                Plot 14, Commercial Avenue, Alaba International Market /<br />
                Lekki-Epe Expressway, Lagos, Nigeria
              </p>
              <p className="font-mono text-neutral-500 dark:text-neutral-400">
                Tel / WhatsApp: <span className="font-semibold text-neutral-800 dark:text-neutral-200">+234 803 123 4567</span>
              </p>
            </div>
          </div>

          {/* RIGHT: Invoice Code & Metadata */}
          <div className="flex flex-col sm:items-end text-left sm:text-right space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
              Official Order Quotation
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-neutral-900">
              {public_code || orderId}
            </h1>

            <div className="pt-0.5">{getStatusBadge(status)}</div>

            <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1 pt-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Created At
                </span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {formatPickupDate(created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs sm:text-sm min-w-[500px] sm:min-w-full">
            <thead>
              <tr className="border-b border-neutral-200  text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                <th className="pb-3 px-1 sm:px-2 w-8 text-center hidden sm:table-cell">#</th>
                <th className="pb-3 px-1 sm:px-2 w-14 hidden sm:table-cell">Image</th>
                <th className="pb-3 px-1 sm:px-2">Product</th>
                <th className="pb-3 px-1 sm:px-2 text-center w-16 sm:w-20">Qty</th>
                <th className="pb-3 px-1 sm:px-2 text-right w-24 sm:w-28">Price (₦)</th>
                <th className="pb-3 px-1 sm:px-2 text-right w-28 sm:w-32">Subtotal (₦)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              <TableRow order_items={order_items} />
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={4} className="hidden sm:table-cell" />
                <td colSpan={2} className="pt-6">
                  <div className="flex flex-col gap-2 items-end text-right border-t border-neutral-200/80  pt-4">
                    
                    {/* Estimated Total */}
                    <div className="flex items-center justify-between w-full sm:w-64 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      <span>Estimated Total:</span>
                      <span className={`font-mono text-xs sm:text-sm ${agreed_total ? "line-through text-neutral-400" : "font-bold text-neutral-900"}`}>
                        ₦{Number(estimated_total).toLocaleString()}
                      </span>
                    </div>

                    {/* Final Agreed Total */}
                    {agreed_total && (
                      <div className="flex items-center justify-between w-64 pt-2 border-t border-dashed border-neutral-200 text-sm font-bold text-neutral-900
                      ">
                        <span className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-extrabold">
                          Agreed Total:
                        </span>
                        <span className="font-mono text-lg sm:text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                          ₦{Number(agreed_total).toLocaleString()}
                        </span>
                      </div>
                    )}

                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Customer & Pickup Details Box */}
        <div className="rounded-xl bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/70  p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
            Customer & Pickup Information
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 text-xs font-medium text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-neutral-400 block text-[10px]">Customer Name</span>
                <span className="font-semibold text-neutral-900">{customer_name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-neutral-400 block text-[10px]">Phone Number</span>
                <span className="font-semibold text-neutral-900">{customer_phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-neutral-400 block text-[10px]">Pickup Date</span>
                <span className="font-semibold text-neutral-900">{pickup_date || "Not specified"}</span>
              </div>
            </div>

            {pickupTimeSlot && (
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                <div>
                  <span className="text-neutral-400 block text-[10px]">Time Slot</span>
                  <span className="font-semibold text-neutral-900">{pickupTimeSlot}</span>
                </div>
              </div>
            )}

            {orderNote && (
              <div className="flex items-start gap-2.5 sm:col-span-2">
                <NotebookPen className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 block text-[10px]">Special Instructions / Notes</span>
                  <span className="font-normal text-neutral-700 dark:text-neutral-300">{orderNote}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp Negotiation Callout (Hidden on Print) */}
        <div className="rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400">
              Ready to finalize pricing and pickup?
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
              Send order code <strong className="font-mono text-neutral-900 font-bold">{public_code || orderId}</strong> to our sales rep on WhatsApp to verify current stock and negotiate discounts.
            </p>
          </div>

          <a
            href={`https://wa.me/2348143241605?text=Hi,%20I%20want%20to%20finalize%20my%20order%20${public_code || orderId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Negotiate on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}