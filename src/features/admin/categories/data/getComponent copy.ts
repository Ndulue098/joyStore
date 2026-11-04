import { createClient } from "@/lib/supabase/server";

export async function getComponent(){
  const supabase=await createClient();

  const {data, error}=await supabase
              .from("categories")
              .select('*, products:product!category_id(*)')
              .order("created_at",{ascending:false})
  if(error){
    console.error("Error fetching categories with products:", error.message);
    return []
  }
 
  return data
}

export async function getCategoriesSubcategoriesAndProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(`
      *,
      products:product!category_id(*),
      subcategories:categories!parent_id(
        *,
        products:product!category_id(*)
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