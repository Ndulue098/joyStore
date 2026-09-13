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