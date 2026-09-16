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