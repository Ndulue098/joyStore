// src/features/admin/categories/data/getProductById.ts (or your path)
import { createClient } from '@/lib/supabase/server';
import { ProductsType } from '@/src/types/types';

export async function getProductById(id: number | string): Promise<ProductsType | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('product')
    .select(`
      *,
      category:categories!category_id!left (
        id,
        name, 
        slug
      ),
      product_variants(*),
      product_variant_fields(*)
    `)
    .eq('id', id) 
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching product by ID:', error.message);
    return null;
  }

  return data as unknown as ProductsType;
}