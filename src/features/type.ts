export type CartItemTyp={
   id: string;
    category_id: number;
    name: string;
    slug: string;
    sku: string | undefined;
    brand: string;
    description: string;
    short_description: string;
    price: number;
    quantity: number;
    category:string | undefined
    total:number
    imageUrl:string
}

export type Order_item={
    id:string;
    order_id: string;
    quantity: number;
    subtotal: number;
    created_at:string;
      product_id: number;
      unit_price:number
      product_name:string
}

export type CategoryRelation = {
  id: number;
  name: string;
  slug: string;
};

export type ProductType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  brand?: string;
  sku?: string;
  price: number;
  discount?: number;
  is_active: boolean;
  featured: boolean;
  is_best_seller: boolean;
  is_new: boolean; // Changed from literal 'true' to boolean
  stock_quantity: number;
  stock_status?: string;
  unit?: string;
  specifications?: Record<string, any>;
  created_at: string;
  updatedAt?: string;
  imageUrl?: string;
  images?: string[];
  category_id: number;
  category?: CategoryRelation; // Added relation populated by Supabase select
};

export type CategoryType={
    id:number;
    created_at: string;
    parent_id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl: null;
    is_active: boolean;
    sort_order: string;
    updatedAt: string
    products: ProductType[]
    // subcategories?:ProductType[]
}


export type OrderType={
    id:string;
    public_code:string;
    customer_name:string;
    customer_phone:number;
    pickup_date:string;
    note:string;
    estimated_total:number;
    agreed_total:number|null;
    status:string;
    created_at:string;
    updated_at:string;
    expires_at:string|null;
    order_items:[];
    item_count:number;
}

// {
//     id: 'd7726624-eca6-4502-b004-c8552eb361c2',
//     public_code: 'ORD-F5NRQ',
//     customer_name: 'okiri',
//     customer_phone: '09143241605',
//     pickup_date: '2026-09-17',
//     notes: 'Time Slot: afternoon | User Notes: nothing there',
//     estimated_total: 667.48,
//     agreed_total: null,
//     status: 'draft',
//     created_at: '2026-09-15T17:15:55.162197+00:00',
//     updated_at: '2026-09-15T17:15:55.162197+00:00',
//     expires_at: null,
//     order_items: [ [Object] ],
//     item_count: 3
//   },