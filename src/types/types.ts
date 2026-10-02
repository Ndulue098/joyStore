export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export type stock_status = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ProductSpecification {
  label: string;
  value: string;
}


type category ={
  id: string;
  name: string;
  slug: string;
}

type specifications={

}

export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  category_id:number;
  name: string;
  slug: string;
  sku?: string;
  brand: string;
  description: string;
  short_description: string;
  price: number;
  discount:number;
  stock_quantity: number;
  stock_status:stock_status;
  unit: string;
  featured: boolean;
  is_active: boolean;
  is_best_seller: boolean;
  is_new: boolean;
  specifications:Record<string, string>;
  category?: category;
  imageUrl:string

}

//  id: 9,
//     created_at: '2026-09-11T00:55:29.852483+00:00',
//     updated_at: '2026-09-11T00:55:29.852483+00:00',
//     category_id: 3,
//     name: 'Industrial Black Iron Cage Chandelier',
//     slug: 'industrial-black-iron-cage-chandelier',
//     sku: 'CHAN-IRON-008',
//     brand: 'IronCraft',
//     description: 'Rustic industrial pendant fixture with geometric metal cage design suitable for dining areas.',
//     short_description: 'Rustic 4-light black metal cage pendant light.',
//     price: 129.99,
//     discount: 159.99,
//     stock_quantity: 25,
//     stock_status: 'in_stock',
//     unit: 'pcs',
//     featured: false,
//     is_active: true,
//     is_best_seller: false,
//     is_new: false,
//     specifications: { Finish: 'Matte Black', Lights: '4', Material: 'Wrought Iron' },
//     category: { id: 3, name: 'Chandeliers', slug: 'chandeliers' }

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  imageUrl: string;
  isActive: boolean;
  displayOrder?: number;
}



// stock
export type OrderStatus =
  | 'Draft'
  | 'Submitted'
  | 'Negotiating'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled'
  | 'Expired';




// type casting............................

export type ProductCategoty={
  name:string
  slug:string
  id:number|string
}

export type ProductsType={
brand?:string | null;
category_id:number;
created_at?:string;
description:string
discount?:number
featured:boolean
id:number|string
imageUrl?:null|string;
is_active:boolean
is_best_seller:boolean
is_new:boolean
name:string
price:number
short_description?:string
sku?:string
slug:string
specifications?:Record<string,string>;
stock_quantity:number
stock_status?:"in_stock"|"out_of_order"|undefined|string
unit?:"pcs"|"box"|string |undefined
updated_at?:string
category?:ProductCategoty

}


export type Subcategories={
created_at:string
description:string
id:number
imageUrl:null|string;
is_active:boolean
name:string
parent_id:number
products:ProductsType[]
slug:string;
sort_order:number|string;
updatedAt:string
}


export type CategoryType ={
  created_at:string;
  description:string;
  id:number
  imageUrl:string|null
  is_active:boolean
  name:string
  parent_id:null|number;
  products:ProductsType[]
  slug:string;
  sort_order?:number|string
  subcategories?:Subcategories[] |undefined
  updatedAt:string
}

export type CartItem=Pick<
  ProductsType,
   | "id"
   | "category_id"
   | "name"
   | "slug"
   | "sku"
   | "brand"
   | "description"
   | "short_description"
   | "price"
   | "imageUrl"
> & {
  category?:string;
  total: number;
  quantity: number;
}


// ---------------------------------------------
//Order
// ---------------------------------------------

export type OrderProduct={
  id:number|string
  name:string
  imageUrl:string|null
}

export type OrderItemType={
created_at:string
discount:number
id:string
order_id:string
product:OrderProduct
product_id:number|string
product_name:string
quantity:number
subtotal:number
unit_price:number
}

export type OrderType={
agreed_total:number
created_at:string
customer_name:string
customer_phone:string
discount:number
discountnumber:number
estimated_total:number
expires_at:null;
id:string
notes:string
order_items:OrderItemType[]
pickup_date:string
public_code:string
status:"pending"|"draft"|"confirm"|"completed"|string
updated_at:string
item_count?:number
}


// cart
export type CartType={
  brand?:string | null | undefined
  category?:string | undefined
  category_id:number
  description:string
  id:number|string
  imageUrl?:string | null | undefined
  name:string
  price:number
  quantity:number
  short_description?:string|undefined
  sku?:undefined|string
  slug:string
  total:number
}
