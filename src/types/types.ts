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
// i mutated the getCategoryrev on the getMontlyOrdersByStatus