"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";


interface ItemDiscountUpdate {
  itemId: string;
  unitPrice: number;
  quantity: number;
  discountPct: number;
}

interface UpdateOrderNegotiationPayload {
  orderId: string;
  status: string;
  agreedTotal: number;
  items: ItemDiscountUpdate[];
  discounts:Record<string, number>;
}

export async function getOrderById(id: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      orderItems:order_items(
        id,
        order_id,
        product_id,
        product_name,
        unit_price,
        quantity,
        subtotal,
        created_at,
        product:product(*)
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching order details:", error.message);
    return null;
  }


  console.log(data);
  

  return data;
}




/* 
export async function updateOrderNegotiation({
  orderId,
  status,
  agreedTotal,
  items,
}: UpdateOrderNegotiationPayload) {
  const supabase = createAdminClient();

  try {
    // 1. Fetch current order to get estimated_total
    const { data: currentOrder, error: fetchError } = await supabase
      .from("orders")
      .select("estimated_total")
      .eq("id", orderId)
      .single();

    if (fetchError || !currentOrder) {
      throw new Error(`Order not found: ${fetchError?.message}`);
    }

    const estimatedTotal = Number(currentOrder.estimated_total || 0);

    // 2. Calculate Total Discount = estimated_total - agreed_total
    const totalDiscount = Math.max(0, estimatedTotal - agreedTotal);

    // 3. Update each order_item's subtotal based on line-item discount
    for (const item of items) {
      const rawTotal = item.unitPrice * item.quantity;
      const itemDiscountAmount = (rawTotal * (item.discountPct || 0)) / 100;
      const newSubtotal = Math.max(0, rawTotal - itemDiscountAmount);

      const { error: itemUpdateError } = await supabase
        .from("order_items")
        .update({
          subtotal: newSubtotal,
        })
        .eq("id", item.itemId);

      if (itemUpdateError) {
        throw new Error(
          `Failed to update item ${item.itemId}: ${itemUpdateError.message}`
        );
      }
    }

    // 4. Update order record (status, agreed_total, discount, updated_at)
    const { error: orderUpdateError } = await supabase
      .from("orders")
      .update({
        status,
        agreed_total: agreedTotal,
        discount: totalDiscount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (orderUpdateError) {
      throw new Error(`Failed to update order: ${orderUpdateError.message}`);
    }

    // 5. Revalidate cache for admin orders page
    revalidatePath("/admin/orders");

    return { success: true };
  } catch (error: any) {
    console.error("Error in updateOrderNegotiation:", error);
    return { success: false, error: error.message };
  }
} */
/* 
export async function updateOrderNegotiation({
  orderId,
  status,
  agreedTotal,
  items,
  discounts
}: UpdateOrderNegotiationPayload) {
  const supabase = createAdminClient();


  console.log("discoun <<<------->>>> ",discounts);

  const totalDiscount = Object.values(discounts).reduce((a,b)=>{return a+b},0)
  
  try {
    // 1. Fetch the order's estimated_total
    const { data: currentOrder, error: fetchError } = await supabase
      .from("orders")
      .select("estimated_total")
      .eq("id", orderId)
      .single();

    if (fetchError || !currentOrder) {
      throw new Error(`Order not found: ${fetchError?.message}`);
    }

    const estimatedTotal = Number(currentOrder.estimated_total || 0);

    // 2. Calculate total order discount (estimated_total - agreed_total)
    // const totalDiscount = Math.max(0, estimatedTotal - agreedTotal);
    // const totalDiscount =discounts

    // 3. Update line-item discounts in order_items
    for (const item of items) {
      const rawTotal = item.unitPrice * item.quantity;
      const discountAmount = (rawTotal * (item.discountPct || 0)) / 100;

      const { error: itemUpdateError } = await supabase
        .from("order_items")
        .update({
          discount: discountAmount,
        })
        .eq("id", item.itemId);

      if (itemUpdateError) {
        throw new Error(
          `Failed to update item ${item.itemId}: ${itemUpdateError.message}`
        );
      }
    }

    // 4. Update order record including the new discount field
    const { error: orderUpdateError } = await supabase
      .from("orders")
      .update({
        status,
        agreed_total: agreedTotal,
        discount: totalDiscount, // <--- Updates total order discount column
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (orderUpdateError) {
      throw new Error(`Failed to update order: ${orderUpdateError.message}`);
    }

    revalidatePath("/admin/orders");

    return { success: true };
  } catch (error: any) {
    console.error("Error in updateOrderNegotiation:", error);
    return { success: false, error: error.message };
  }
} */

  export async function updateOrderNegotiation({
  orderId,
  status,
  agreedTotal,
  items,
  discounts,
}: UpdateOrderNegotiationPayload) {
  const supabase = createAdminClient();

  try {
    // 1. Fetch current order to get estimated_total
    const { data: currentOrder, error: fetchError } = await supabase
      .from("orders")
      .select("estimated_total")
      .eq("id", orderId)
      .single();

    if (fetchError || !currentOrder) {
      throw new Error(`Order not found: ${fetchError?.message}`);
    }

    const estimatedTotal = Number(currentOrder.estimated_total || 0);
    let totalOrderDiscountAmount = 0;

    // 2. Update line-item discounts in order_items
    for (const item of items) {
      const discountPct = discounts[item.itemId] || 0;
      const rawTotal = item.unitPrice * item.quantity;
      const discountAmount = (rawTotal * discountPct) / 100;

      totalOrderDiscountAmount += discountAmount;

      const { error: itemUpdateError } = await supabase
        .from("order_items")
        .update({
          discount: discountAmount,
        })
        .eq("id", item.itemId);

      if (itemUpdateError) {
        throw new Error(
          `Failed to update item ${item.itemId}: ${itemUpdateError.message}`
        );
      }
    }

    // 3. Calculate true weighted overall order discount percentage
    const discountNumber = estimatedTotal > 0 
      ? Number(((totalOrderDiscountAmount / estimatedTotal) * 100).toFixed(2))
      : 0;

    // 4. Update the main order record
    const { error: orderUpdateError } = await supabase
      .from("orders")
      .update({
        status,
        agreed_total: agreedTotal,
        discount: totalOrderDiscountAmount, // Total monetary discount (₦)
        discountnumber: discountNumber,     // Weighted overall percentage discount (%)
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (orderUpdateError) {
      throw new Error(`Failed to update order: ${orderUpdateError.message}`);
    }

    revalidatePath("/admin/orders");

    return { success: true };
  } catch (error: any) {
    console.error("Error in updateOrderNegotiation:", error);
    return { success: false, error: error.message };
  }
} 