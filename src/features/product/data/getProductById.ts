 import { createClient } from '@/lib/supabase/server';
import { Product } from '@/src/types/types';

/**
 * Fetch a single product by its ID, including its category details
 */
export async function getProductById(id: number | string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('product')
    .select(`
      *,
      category:categories!category_id!left (
        id,
        name,
        slug
      )
    `)
    .eq('id', id) 
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching product by ID:', error.message);
    return null;
  }

  return data as Product;
}
