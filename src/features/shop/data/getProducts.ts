import { createClient } from "@/lib/supabase/server";

export interface FetchProductsOptions {
  featured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  limit?: number;
  page?: number;
}

/* export async function getProducts(
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

 */


// *********************************** v2
// *********************************** v2
// *********************************** v2
export async function getProducts(
  searchParamsPromise?: Promise<{ [key: string]: string | string[] | undefined }>,
  options: FetchProductsOptions = {}
) {
  const supabase = await createClient();

  // 1. Resolve URL search parameters
  const searchParams = searchParamsPromise ? await searchParamsPromise : {};
  
  const categorySlug =
    typeof searchParams.category === "string" ? searchParams.category : undefined;
  
  const searchQuery =
    typeof searchParams.search === "string" ? searchParams.search.trim() : undefined;

  const sortParam =
    typeof searchParams.sort === "string" ? searchParams.sort : "recommended";

  const {
    featured,
    isBestSeller,
    isNew,
    limit = 10,
    page = 1,
  } = options;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // 2. Fetch category and subcategory IDs if category filter exists
  let categoryIdsToFilter: number[] = [];

  if (categorySlug && categorySlug.trim() !== "") {
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

      if (Array.isArray(targetCategory.subcategories)) {
        targetCategory.subcategories.forEach((sub: { id: number }) => {
          categoryIdsToFilter.push(sub.id);
        });
      }
    }
  }

  // 3. Build base query
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
    .eq("is_active", true);

  // 4. Apply Full-Text Search Filter (Matches product name or description)
  if (searchQuery) {
    query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }

  // 5. Apply Category Filter
  if (categoryIdsToFilter.length > 0) {
    query = query.in("category_id", categoryIdsToFilter);
  }

  // 6. Apply Boolean Filters
  if (typeof featured === "boolean") {
    query = query.eq("featured", featured);
  }
  if (typeof isBestSeller === "boolean") {
    query = query.eq("is_best_seller", isBestSeller);
  }
  if (typeof isNew === "boolean") {
    query = query.eq("is_new", isNew);
  }

  // 7. Apply Dynamic Sorting
  switch (sortParam) {
    case "price-asc":
      query = query.order("price", { ascending: true });
      break;

    case "price-desc":
      query = query.order("price", { ascending: false });
      break;

    case "newest":
      query = query.order("created_at", { ascending: false });
      break;

    case "recommended":
    default:
      query = query
        .order("featured", { ascending: false })
        .order("is_best_seller", { ascending: false })
        .order("created_at", { ascending: false });
      break;
  }

  // 8. Apply Pagination Range
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