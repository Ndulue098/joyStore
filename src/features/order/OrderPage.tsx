import Logo from "@/src/components/layout/Logo";
import { AlarmCheckIcon, CalendarCheck, Clock10, Contact, MessageCircleCheckIcon, NotebookPen, Phone, User } from "lucide-react";
import { getOrderById } from "./data/getOrderByid";
import TableRow from "./components/TableRow";

interface OrderPageProps {
  orderId:string
}

export default async function OrderPage({orderId}: OrderPageProps) {
   const order=await getOrderById(orderId)
    
   console.log(order);


    const {public_code,customer_name,customer_phone,pickup_date,notes,estimated_total,status,created_at,order_items} =order || {}
    const [pickupTimeSlot = "", orderNote = ""] = notes ? notes.split("|") : []    
  return (
    <div className="border rounded-md p-5">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 w-full pb-8 border-b border-neutral-200">
        {/* LEFT: Logo & Company Address */}
        <div className="space-y-4">
            <Logo />
            
            <div className="text-xs text-neutral-600 leading-relaxed max-w-sm space-y-4">
            <p className="font-medium text-neutral-800">
                Plot 14, Commercial Avenue, Alaba International Market /<br />
                Lekki-Epe Expressway, Lagos, Nigeria
            </p>
            <p className="text-neutral-500 font-mono">
                Tel / WhatsApp: <span className="text-neutral-700 font-semibold">+234 803 123 4567</span>
            </p>
            </div>
        </div>

        {/* RIGHT: Invoice / Quotation Meta Details */}
        <div className="flex flex-col sm:items-end text-left sm:text-right space-y-4">
            {/* Quotation Tag & Order Reference ID */}
            <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Official Order Quotation
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-neutral-900">
                {public_code}
            </h3>
            </div>

            {/* Order Date & Customer Info */}
            <div className="text-xs space-y-1 text-neutral-600 pt-1">
            <p className="font-mono text-neutral-500">
                Date: <span className="font-semibold text-neutral-800">December 20th</span>
            </p>
            
            <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                BILLED TO
                </span>
                <p className="text-sm font-bold text-neutral-900 mt-0.5">
                {customer_name}
                </p>
            </div>
            </div>
        </div>
        </div>

      
        <table className="w-full text-left text-xs sm:text-sm">
        {/* Table Header */}
        <thead>
            <tr className="border-y border-neutral-600 bg-neutral-50/50 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            <th className="py-3 px-3 w-10 text-center">#</th>
            <th className="py-3 px-2 w-16 hidden sm:table-cell">Image</th>
            <th className="py-3 px-3">Product</th>
            <th className="py-3 px-3 text-center w-20">Qty</th>
            <th className="py-3 px-3 text-right w-24">Price</th>
            <th className="py-3 px-3 text-right w-28">Subtotal</th>
            </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-neutral-200 border-b border-neutral-400">
          <TableRow order_items={order_items}/>
        </tbody>

        {/* Table Footer / Totals */}
        <tfoot>
            <tr>
            <td colSpan={4} className="hidden sm:table-cell" />
            <td colSpan={2} className="py-4 ">
                <div className="space-y-2 text-right">
                <div className="flex justify-between sm:justify-end gap-6 text-sm font-bold text-neutral-900 border-b p-2 border-neutral-200 pt-2">
                    <span>Final Price:</span>
                    <span className="font-mono text-amber-700">{estimated_total}</span>
                </div>
                </div>
            </td>
            </tr>
        </tfoot>
        </table>


        <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2.5">Customer Information</span>
            <div className="flex flex-col gap-0.5 ml-2">
                <p className="text-sm font-semibold text-neutral-700 mt-0.5 flex items-center gap-2">
                    <span><User className="w-3 h-3"/></span>  {customer_name}
                </p>
                <p className="text-sm font-semibold text-neutral-700 mt-0.5 flex items-center gap-2">
                    <span><Phone className="w-3 h-3"/></span> {customer_phone}
                </p>
                <p className="text-sm font-semibold text-neutral-700 mt-0.5 flex items-center gap-2">
                   <span><CalendarCheck className="w-3 h-3"/></span> Pickup: {pickup_date}
                </p>
                <p className="text-sm font-semibold text-neutral-700 mt-0.5 flex items-center gap-2">
                   <span><AlarmCheckIcon className="w-3 h-3"/></span>{pickupTimeSlot}
                </p>
                <p className="text-sm font-semibold text-neutral-700 mt-0.5 flex items-center gap-2">
                    <span><NotebookPen className="w-3 h-3"/></span>
                    {orderNote}
                </p>


            </div>


        </div>

       <div className="bg-amber-50/50 rounded-md border border-amber-200/60 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Ready to finalize pricing and pickup?
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg leading-relaxed">
            Send your order code <strong className="font-mono text-neutral-900">{public_code}</strong> to our sales team on WhatsApp to confirm availability and negotiate the final total.
          </p>
        </div>

        <a
          href={`https://wa.me/2348143241605?text=Hi,%20I%20want%20to%20finalize%20my%20order%20${orderId || "BL-K82MPL"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-sm transition-colors shadow-xs shrink-0 cursor-pointer w-full sm:w-auto text-center"
        >
          <MessageCircleCheckIcon className="w-4 h-4" />
          <span>Negotiate on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}