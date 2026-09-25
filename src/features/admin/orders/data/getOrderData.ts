
import { createClient } from "@/lib/supabase/server";

export async function getAllOrders() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(count)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error.message);
    return [];
  }

  // Transform data to easily access item count: order.item_count
  return data.map((order) => ({
    ...order,
    item_count: order.order_items?.[0]?.count || 0,
  }));
}

