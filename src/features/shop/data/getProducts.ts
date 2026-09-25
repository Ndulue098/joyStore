import { createClient } from "@/lib/supabase/server";

export interface FetchProductsOptions {
  featured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  limit?: number;
  page?: number;
}

export async function getProducts(
  searchParamsPromise?: Promise<{ [key: string]: string | string[] | undefined }>,
  options: FetchProductsOptions = {}
) {
  const supabase = await createClient();

  // Await searchParams passed from Next.js 15 Server Components
  const resolvedSearchParams = searchParamsPromise ? await searchParamsPromise : {};
  const categoryParam = resolvedSearchParams.category;

  const categorySlug = typeof categoryParam === "string" ? categoryParam : undefined;

  const {
    featured,
    isBestSeller,
    isNew,
    limit = 10,
    page = 1,
  } = options;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let categoryIdsToFilter: number[] = [];

  // If category parameter exists, find its ID and subcategory IDs
  if (categorySlug && categorySlug.trim() !== "") {
    // 1. Fetch the target category along with its subcategories
    const { data: targetCategory } = await supabase
      .from("categories")
      .select(`
        id,
        subcategories:categories!parent_id (
          id
        )
      `)
      .eq("slug", categorySlug)
      .single();

    if (targetCategory) {
      categoryIdsToFilter.push(targetCategory.id);

      // Add subcategory IDs if present
      if (Array.isArray(targetCategory.subcategories)) {
        targetCategory.subcategories.forEach((sub: { id: number }) => {
          categoryIdsToFilter.push(sub.id);
        });
      }
    }
  }

  // 2. Build product query
  let query = supabase
    .from("product")
    .select(
      `
      *,
      category:categories!category_id!left (
        id,
        name,
        slug
      )
    `,
      { count: "exact" }
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  // 3. Apply category filter using category_id .in(...)
  if (categoryIdsToFilter.length > 0) {
    query = query.in("category_id", categoryIdsToFilter);
  }

  // 4. Additional boolean filters
  if (typeof featured === "boolean") {
    query = query.eq("featured", featured);
  }
  if (typeof isBestSeller === "boolean") {
    query = query.eq("is_best_seller", isBestSeller);
  }
  if (typeof isNew === "boolean") {
    query = query.eq("is_new", isNew);
  }

  // Apply pagination
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error(error.message);
  }

  return {
    products: (data as Product[]) ?? [],
    totalCount: count ?? 0,
  };
}