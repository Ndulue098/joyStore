export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  sku: string; 
  brand: string | null;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  stock_status: string;
  unit: string;
  featured: boolean;
  is_active: boolean;
  is_best_seller: boolean;
  is_new: boolean;
  specifications: Record<string, any>;
  created_at: string;
  updated_at: string;
  category?: Category; // Joined category data
}

export interface FetchProductsOptions {
  categorySlug?: string;
  featured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  limit?: number;
  page?: number;
}