/* import { createClient } from "@/lib/supabase/server";

export async function getComponent(){
  const supabase = await createClient();

  const { data, error } = await supabase
              .from("categories")
              .select(`
                *,
                products:product!category_id(
                  *,
                  product_variants(*),
                  product_variant_fields(*)
                )
              `)
              .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching categories with products & variants:", error.message);
    return [];
  }
 
  return data;
}

export async function getCategoriesSubcategoriesAndProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(`
      *,
      products:product!category_id(
        *,
        product_variants:product_variants(*),
        product_variant_fields:product_variant_fields(*)
      ),
      subcategories:categories!parent_id(
        *,
        products:product!category_id(
          *,
          product_variants:product_variants(*),
          product_variant_fields:product_variant_fields(*)
        )
      )
    `)
    .is("parent_id", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching nested categories with variants:", error.message);
    return [];
  }

  return data;
}
 */
/* import { createClient } from "@/lib/supabase/server";
export async function getComponent(){
  const supabase = await createClient();

const { data, error } = await supabase
              .from("categories")
              .select(`
                *,
                products:product!category_id(
                  *,
                  product_variants:product_variants!product_variants_product_id_fkey(*),
                  product_variant_fields:product_variant_fields!product_variant_fields_product_id_fkey(*)
                )
              `)
              .order("created_at", { ascending: false });

  if(error){
    console.error("Error fetching categories with products:", error.message);
    return [];
  }
 
  return data;
}

export async function getCategoriesSubcategoriesAndProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(`
      *,
      products:product!category_id(
        *,
        product_variants:product_variants!product_variants_product_id_fkey(*),
        product_variant_fields:product_variant_fields!product_variant_fields_product_id_fkey(*)
      ),
      subcategories:categories!parent_id(
        *,
        products:product!category_id(
          *,
          product_variants:product_variants!product_variants_product_id_fkey(*),
          product_variant_fields:product_variant_fields!product_variant_fields_product_id_fkey(*)
        )
      )
    `)
    .is("parent_id", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching nested categories with products:", error.message);
    return [];
  }

  return data;
} */


  import { createClient } from "@/lib/supabase/server";
 export async function getComponent(){
  const supabase = await createClient();

  const { data, error } = await supabase
              .from("categories")
              .select(`
                *,
                products:product!category_id(
                  *,
                  product_variants:product_variants!product_variants_product_id_fkey(*),
                  product_variant_fields:product_variant_fields!product_variant_fields_product_id_fkey(*)
                )
              `)
              .order("created_at", { ascending: false });

  if(error){
    console.error("Error fetching categories with products:", error.message);
    return [];
  }
 
  return data;
}

export async function getCategoriesSubcategoriesAndProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(`
      *,
      products:product!category_id(
        *,
        product_variants:product_variants!product_variants_product_id_fkey(*),
        product_variant_fields:product_variant_fields!product_variant_fields_product_id_fkey(*)
      ),
      subcategories:categories!parent_id(
        *, 
        products:product!category_id(
          *,
          product_variants:product_variants!product_variants_product_id_fkey(*),
          product_variant_fields:product_variant_fields!product_variant_fields_product_id_fkey(*)
        )
      )
    `)
    .is("parent_id", null) // Fetch only root/parent categories
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching nested categories with products:", error.message);
    return [];
  }

  return data;
}