"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layers, Loader2, User, Phone, Calendar, FileText } from "lucide-react";
import { getOrderById, updateOrderNegotiation } from "../action"; // Adjust action imports
import { formatPickupDate } from "@/src/features/lib/formatPickupDate";
import { OrderItemType, OrderType } from "@/src/types/types";



interface ReviewOrderProps {
  children: React.ReactNode;
  id: string;
}

export default function ReviewOrder({ children, id }: ReviewOrderProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [order, setOrder] = useState<OrderType | null>(null);
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<string>("draft");
  const [agreedTotal, setAgreedTotal] = useState<number | string>("");

  // Fetch order data whenever modal opens
  useEffect(() => {
    if (!open) return;

    async function fetchDetails() {
      setLoading(true);
      try {
        const data = await getOrderById(id);
        const {orderItems,...restData}=data 
        if (data) {
          console.log("order item data:: ", data);
          setOrder({...restData,order_items:orderItems});
          setStatus(data.status || "draft");
          
          // Initial discounts start at 0
          const initialDiscounts: Record<string, number> = {};
          data.order_items?.forEach((item: OrderItemType) => {
            initialDiscounts[item.id] = 0;
          });
          setDiscounts(initialDiscounts);

          // Default agreed total to current agreed_total or estimated_total
          setAgreedTotal(data.agreed_total ?? data.estimated_total ?? 0);
        }
      } catch (error) {
        console.error("Failed to load order details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [open, id]);

  // Calculate dynamic subtotal for an item based on percentage discount
  const calculateSubtotal = (unitPrice: number, qty: number, discountPct: number) => {
    const rawTotal = unitPrice * qty;
    const discountAmount = (rawTotal * (discountPct || 0)) / 100;
    return Math.max(0, rawTotal - discountAmount);
  };

  // Handle discount percent change per line item and recalculate total
  const handleDiscountChange = (itemId: string, percent: number) => {
    const safePercent = Math.min(100, Math.max(0, percent || 0));
    const updatedDiscounts = { ...discounts, [itemId]: safePercent };
    setDiscounts(updatedDiscounts);

    // Auto-recalculate agreed total sum across all items
    if (order?.order_items) {
      const newAgreedTotal = order.order_items.reduce((acc, item) => {
        const itemDiscount = updatedDiscounts[item.id] || 0;
        return acc + calculateSubtotal(item.unit_price, item.quantity, itemDiscount);
      }, 0);

      setAgreedTotal(newAgreedTotal.toFixed(2));
    }
  };

  const handleSaveNegotiation = () => {
    if (!order) return;

    startTransition(async () => {
      try {
        // Map line items with their applied discounts for the server action
        const itemsPayload = order.order_items.map((item) => ({
          itemId: item.id,
          unitPrice: item.unit_price,
          quantity: item.quantity,
          discountPct: discounts[item.id] || 0,
        }));

        const res = await updateOrderNegotiation({
          orderId: id,
          status,
          agreedTotal: Number(agreedTotal),
          items: itemsPayload,
          discounts
        });

        if (res.success) {
          setOpen(false);
        } else {
          alert(res.error || "Failed to update order negotiation.");
        }
      } catch (error) {
        console.error("Failed to save negotiation:", error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >{children}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-neutral-900 my-3 flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-600" />
            <span>Order Negotiation & Details</span>
            {order?.public_code && (
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 ml-auto">
                #{order.public_code}
              </span>
            )}
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            Review customer details, set item discounts, adjust agreed total, and update order status.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-neutral-500">
            <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
            <p className="text-xs">Fetching order details...</p>
          </div>
        ) : order ? (
          <div className="space-y-3 pt-2">
            {/* CUSTOMER INFORMATION CARD */}
            <h4 className="text-sm font-bold w-full uppercase tracking-wider text-neutral-800 flex items-center justify-center gap-1.5">
              {/* <User className="h-3.5 w-3.5 text-neutral-400" /> */}
              Customer Information
            </h4>
            <div className="p-4 rounded-mc border border-neutral-200 bg-neutral-50/70 space-y-2.5">

              <div className="flex flex-col gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-neutral-400" /> 
                  <span className="text-neutral-400">Name:</span>
                  <span className="font-semibold text-neutral-800 capitalize">
                    {order.customer_name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-neutral-400" />
                  <span className="text-neutral-400">Phone:</span>
                  <span className="font-mono font-medium text-neutral-800">
                    {order.customer_phone}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                  <span className="text-neutral-400">Pickup Date:</span>
                  <span className="font-medium text-neutral-800">
                    {formatPickupDate(order.pickup_date)}
                  </span>
                </div>

                <div className="flex items-start gap-2 col-span-1 sm:col-span-2">
                  <FileText className="h-3.5 w-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-400 shrink-0">Notes:</span>
                  <span className="text-neutral-700 italic">
                    {order.notes || "No notes provided."}
                  </span>
                </div>
              </div>
            </div>

            {/* ORDER ITEMS TABLE */}
            <div className="overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100/80 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    <th className="py-2.5 px-3">Product</th>
                    <th className="py-2.5 px-2 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 px-3 text-center w-24">Discount (%)</th>
                    <th className="py-2.5 px-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  {order.order_items?.map((item) => {
                    const currentDiscount = discounts[item.id] || 0;
                    const calculatedSubtotal = calculateSubtotal(
                      item.unit_price,
                      item.quantity,
                      currentDiscount
                    );

                    return (
                      <tr key={item.id} className="hover:bg-neutral-50/60">
                        <td className="py-3 px-3 font-medium text-neutral-900 max-w-[200px] truncate">
                          {item.product_name}
                        </td>
                        <td className="py-3 px-2 text-center font-mono">{item.quantity}</td>
                        <td className="py-3 px-3 text-right font-mono text-neutral-500">
                          ₦{item.unit_price.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={discounts[item.id] ?? 0}
                            onChange={(e) =>
                              handleDiscountChange(item.id, parseFloat(e.target.value))
                            }
                            className="w-16 text-center font-mono py-1 px-1.5 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                            placeholder="0%"
                          />
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-neutral-900">
                          ₦{calculatedSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* STATUS & AGREED TOTAL CONTROLS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* STATUS SELECT */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700">
                  Update Status
                </label>
                <Select value={status} onValueChange={(value) => setStatus(value ?? "")}>
                  <SelectTrigger className="w-full h-9 text-xs">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    {/* <SelectItem value="confirmed">Confirmed</SelectItem> */}
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* AGREED TOTAL INPUT */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 flex items-center justify-between">
                  <span>Agreed Total (₦)</span>
                  <span className="text-[10px] font-normal text-neutral-400">
                    Est: ₦{order.estimated_total?.toLocaleString()}
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={agreedTotal}
                  onChange={(e) => setAgreedTotal(e.target.value)}
                  className="w-full h-9 px-3 font-mono font-bold text-sm text-neutral-900 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleSaveNegotiation}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Update Negotiation</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-neutral-500">
            Order information not found.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}