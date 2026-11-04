import { createClient } from "@/lib/supabase/server";
import { ProductsType } from "@/src/types/types";

export async function getRelatedProducts(
  categoryId: number | null,
  currentProductId: number | string,
  limit: number = 8
): Promise<ProductsType[]> {
  // If the current product has no category assigned, return an empty list
  if (!categoryId) return [];

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
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', currentProductId) // Exclude the product currently being viewed
    .limit(limit);

  if (error) {
    console.error('Error fetching related products:', error.message);
    return [];
  }

  return (data as unknown as ProductsType[]) ?? [];
}