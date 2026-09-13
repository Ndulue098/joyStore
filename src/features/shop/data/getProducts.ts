import { createClient } from '@/lib/supabase/server';
import { Product, FetchProductsOptions } from '../types';

export async function getProducts(options: FetchProductsOptions = {}) {
  const supabase = await createClient();
  const {
    categorySlug,
    featured,
    isBestSeller,
    isNew,
    limit = 10,
    page = 1,
  } = options;  

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // 1. Explicitly use left join syntax: category:categories!left(...)
  let query = supabase
    .from('product')
    .select(
      `
      *,
      category:categories!category_id!left (
        id,
        name,
        slug
      )
    `,
      { count: 'exact' }
    )
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to);

//   // 2. Strict check on dynamic filters
//   if (typeof featured === 'boolean') {
//     query = query.eq('featured', featured);
//   }
//   if (typeof isBestSeller === 'boolean') {
//     query = query.eq('is_best_seller', isBestSeller);
//   }
//   if (typeof isNew === 'boolean') {
//     query = query.eq('is_new', isNew);
//   }
  
//   // Only filter by category slug if an actual string value exists
//   if (categorySlug && categorySlug.trim() !== '') {
//     query = query.eq('category.slug', categorySlug);
//   }

  const { data, count, error } = await query;

  if (error) {
    console.error('Error fetching products:', error.message);
    throw new Error(error.message);
  }

  return {
    products: (data as Product[]) ?? [],
    totalCount: count ?? 0,
  };
}