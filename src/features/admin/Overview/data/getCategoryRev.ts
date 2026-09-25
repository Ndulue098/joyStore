 import { createClient } from '@/lib/supabase/server';

export interface CategoryRevenueData {
  categoryName: string;
  revenue: number;
}

export interface CategoryDiscountData {
  categoryName: string;
  catalogDiscount: number;
  negotiatedDiscount: number;
}

export interface MonthlyOrderStatusData {
  month: string;
  completed: number;
  cancelled: number;
  pending: number;
}

export interface TopProductData {
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
  stockQuantity: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalConfirmedOrders: number;
}


export async function getCategoryRevenue(){
  // const supabase = createAdminClient();
  const supabase = await createClient();

 // Query order_items -> product -> categories
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      subtotal,
      product (
        id,
        name,
        category_id,
        categories (
          id,
          name
        )
      )
    `);

  if (error) {
    console.error("Error fetching category revenue:", error.message);
    return [];
  }

  const revenueMap: Record<string, number> = {};

  data?.forEach((item: any) => {
    // Extract category name via product relation
    const product = Array.isArray(item.product) ? item.product[0] : item.product;
    const category = Array.isArray(product?.categories) 
      ? product?.categories[0] 
      : product?.categories;

    const categoryName = category?.name || "Uncategorized";
    const subtotal = Number(item.subtotal || 0);

    revenueMap[categoryName] = (revenueMap[categoryName] || 0) + subtotal;
  });

  return Object.entries(revenueMap).map(([categoryName, revenue]) => ({
    categoryName,
    revenue: Number(revenue.toFixed(2)),
  }));
}


// get getDiscountBreakdownByCategory

export async function getDiscountBreakdownByCategory(): Promise<CategoryDiscountData[]> {
  const supabase = await createClient();
  

  // Query order_items along with their order and product category info
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      subtotal,
      discount,
      order_id,
      product (
        id,
        categories (
          name
        )
      ),
      orders (
        id,
        discount,
        estimated_total
      )
    `);

  if (error) {
    console.error("Error fetching discount breakdown:", error.message);
    return [];
  }

  const categoryMap: Record<
    string,
    { catalogDiscount: number; negotiatedDiscount: number }
  > = {};

  data?.forEach((item: any) => {
    const product = Array.isArray(item.product) ? item.product[0] : item.product;
    const category = Array.isArray(product?.categories)
      ? product?.categories[0]
      : product?.categories;
    const categoryName = category?.name || "Uncategorized";

    const order = Array.isArray(item.orders) ? item.orders[0] : item.orders;

    // 1. Line-item catalog discount amount
    const lineDiscount = Number(item.discount || 0);

    // 2. Proportionally allocate order-level negotiated discount to this item's category
    const orderDiscount = Number(order?.discount || 0);
    const orderEstimatedTotal = Number(order?.estimated_total || 0);
    const itemSubtotal = Number(item.subtotal || 0);

    const allocatedNegotiatedDiscount =
      orderEstimatedTotal > 0
        ? (itemSubtotal / orderEstimatedTotal) * orderDiscount
        : 0;

    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = { catalogDiscount: 0, negotiatedDiscount: 0 };
    }

    categoryMap[categoryName].catalogDiscount += lineDiscount;
    categoryMap[categoryName].negotiatedDiscount += allocatedNegotiatedDiscount;
  });

  return Object.entries(categoryMap).map(([categoryName, values]) => ({
    categoryName,
    catalogDiscount: Number(values.catalogDiscount.toFixed(2)),
    negotiatedDiscount: Number(values.negotiatedDiscount.toFixed(2)),
  }));
}

export async function getMonthlyOrdersByStatus(
  year: number = new Date().getFullYear()
): Promise<MonthlyOrderStatusData[]> {
  const supabase =await createClient();

  // Query orders within the specified year
  const startDate = `${year}-01-01T00:00:00.000Z`;
  const endDate = `${year}-12-31T23:59:59.999Z`;

  const { data, error } = await supabase
    .from("orders")
    .select("created_at, status, agreed_total")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  if (error) {
    console.error("Error fetching monthly order status:", error.message);
    return [];
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Initialize monthly buckets
  const monthlyMap: Record<string, { completed: number; cancelled: number; pending: number }> = {};
  months.forEach((m) => {
    monthlyMap[m] = { completed: 0, cancelled: 0, pending: 0 };
  });

  data?.forEach((order) => {
    const date = new Date(order.created_at);
    const monthName = months[date.getMonth()];

    const amount = Number(order.agreed_total ?? order.estimated_total ?? 0);
    const status = (order.status || "draft").toLowerCase();

    if (status === "completed") {
      monthlyMap[monthName].completed += amount;
    } else if (status === "cancelled") {
      monthlyMap[monthName].cancelled += amount;
    } else {
      // draft, negotiation, pending
      monthlyMap[monthName].pending += amount;
    }
  });

  return months.map((month) => ({
    month,
    completed: Number(monthlyMap[month].completed.toFixed(2)),
    cancelled: Number(monthlyMap[month].cancelled.toFixed(2)),
    pending: Number(monthlyMap[month].pending.toFixed(2)),
  }));
}






export async function getTopSellingProducts(
  limit: number = 10
): Promise<TopProductData[]> {
  const supabase = await createClient();

  // Query order_items joined with product stock quantity
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      product_name,
      quantity,
      subtotal,
      product (
        stock_quantity
      )
    `);

  if (error) {
    console.error("Error fetching top products:", error.message);
    return [];
  }

  // Aggregate quantity and subtotal revenue by product name
  const productMap: Record<
    string,
    { totalQuantity: number; totalRevenue: number; stockQuantity: number }
  > = {};

  data?.forEach((item: any) => {
    const productName = item.product_name || "Unknown Product";
    const quantity = Number(item.quantity || 0);
    const subtotal = Number(item.subtotal || 0);

    const product = Array.isArray(item.product) ? item.product[0] : item.product;
    const stockQuantity = Number(product?.stock_quantity || 0);

    if (!productMap[productName]) {
      productMap[productName] = {
        totalQuantity: 0,
        totalRevenue: 0,
        stockQuantity,
      };
    }

    productMap[productName].totalQuantity += quantity;
    productMap[productName].totalRevenue += subtotal;
  });

  // Sort by revenue descending and slice top N
  return Object.entries(productMap)
    .map(([productName, stats]) => ({
      productName,
      totalQuantity: stats.totalQuantity,
      totalRevenue: Number(stats.totalRevenue.toFixed(2)),
      stockQuantity: stats.stockQuantity,
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);
}



export async function getDashboardTotals(): Promise<DashboardStats> {
  const supabase = await createClient();

  try {
    // Run all count queries concurrently in a single request batch
    const [
      productsCount,
      categoriesCount,
      ordersCount,
      confirmedOrdersCount,
    ] = await Promise.all([
      // 1. Total Products
      supabase
        .from("product")
        .select("*", { count: "exact", head: true }),

      // 2. Total Categories
      supabase
        .from("categories")
        .select("*", { count: "exact", head: true }),

      // 3. Total Orders
      supabase
        .from("orders")
        .select("*", { count: "exact", head: true }),

      // 4. Confirmed Orders
      supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "confirmed"),
    ]);

    return {
      totalProducts: productsCount.count ?? 0,
      totalCategories: categoriesCount.count ?? 0,
      totalOrders: ordersCount.count ?? 0,
      totalConfirmedOrders: confirmedOrdersCount.count ?? 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard totals:", error);
    return {
      totalProducts: 0,
      totalCategories: 0,
      totalOrders: 0,
      totalConfirmedOrders: 0,
    };
  }
}