export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  categoryName: string;
  brand: string;
  price: number;
  stockQuantity: number;
  stockStatus: StockStatus;
  images: ProductImage[];
  featured: boolean;
  specifications: Record<string, string> | ProductSpecification[];
  rating?: number;
  sku?: string;
}

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