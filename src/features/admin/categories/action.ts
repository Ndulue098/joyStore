'use server';

import { createAdminClient } from '@/lib/supabase/admin'; // Adjust import path
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  try {
    const supabase = createAdminClient();

    const title = formData.get('title') as string;
    const description = (formData.get('description') as string) || null;
    const image = formData.get('image') as File;
    
    // Parse boolean from string "true" / "false"
    const is_active = formData.get('isActive') === 'true';

    // Parse string ID into integer, or null if "null" / missing
    const parentIdRaw = formData.get('parentId') as string;
    const parent_id = parentIdRaw && parentIdRaw !== 'null' ? Number(parentIdRaw) : null;

    if (!title || !image) {
      return { success: false, error: 'Title and image are required.' };
    }

    // 1. Generate slug from title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // 2. Upload image to Supabase Storage bucket ('categories')
    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `categories/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('categories')
      .upload(filePath, image, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage Upload Error:', uploadError.message);
      return { success: false, error: 'Failed to upload category image.' };
    }

    // 3. Get Public URL for the uploaded image
    const { data: urlData } = supabase.storage
      .from('categories')
      .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    // 4. Insert row into 'categories' database table
    const { data, error: dbError } = await supabase
      .from('categories')
      .insert({
        name: title,
        slug,
        description,
        imageUrl,
        is_active,  // Column name in DB is is_active
        parent_id,  // Column name in DB is parent_id
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database Insert Error:', dbError.message);
      return { success: false, error: dbError.message };
    }

    revalidatePath('/admin/categories');

    return { success: true, category: data };
  } catch (error: any) {
    console.error('Unexpected Error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred.' };
  }
}


// update category
export async function updateCategory(formData: FormData) {
  try {
    const supabase = createAdminClient();

    const idRaw = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = (formData.get('description') as string) || null;
    const image = formData.get('image') as File | null;
    
    // Parse boolean from string "true" / "false"
    const is_active = formData.get('isActive') === 'true';

    // Parse string ID into integer, or null if "null" / missing / "none"
    const parentIdRaw = formData.get('parentId') as string;
    const parent_id = parentIdRaw && parentIdRaw !== 'null' && parentIdRaw !== '' ? Number(parentIdRaw) : null;

    if (!idRaw) {
      return { success: false, error: 'Category ID is required for updating.' };
    }

    if (!title) {
      return { success: false, error: 'Title is required.' };
    }

    const id = Number(idRaw);

    // 1. Generate slug from updated title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // 2. Prepare payload with fields that always update
    const updatePayload: Record<string, any> = {
      name: title,
      slug,
      description,
      is_active,
      parent_id,
    };

    // 3. Upload new image if provided
    if (image && image.size > 0) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `categories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('categories')
        .upload(filePath, image, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Storage Upload Error:', uploadError.message);
        return { success: false, error: 'Failed to upload category image.' };
      }

      const { data: urlData } = supabase.storage
        .from('categories')
        .getPublicUrl(filePath);

      updatePayload.imageUrl = urlData.publicUrl;
    }

    // 4. Update row in 'categories' database table
    const { data, error: dbError } = await supabase
      .from('categories')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (dbError) {
      console.error('Database Update Error:', dbError.message);
      return { success: false, error: dbError.message };
    }

    revalidatePath('/admin/categories');

    return { success: true, category: data };
  } catch (error: any) {
    console.error('Unexpected Error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred.' };
  }
}

// creating

export async function createProduct(formData: FormData) {
  try {
    const supabase = createAdminClient();

    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const sku = (formData.get('sku') as string) || null;
    const category_id = formData.get('category_id') as string;
    const price = Number(formData.get('price'));
    const discount = Number(formData.get('discount') || 0);
    const stock_quantity = Number(formData.get('stock_quantity'));
    const stock_status = formData.get('stock_status') as string;
    const unit = (formData.get('unit') as string) || 'pcs';
    const short_description = (formData.get('short_description') as string) || null;
    const description = (formData.get('description') as string) || null;
    
    const is_active = formData.get('is_active') === 'true';
    const is_best_seller = formData.get('is_best_seller') === 'true';
    const is_new = formData.get('is_new') === 'true';

    const specificationsRaw = formData.get('specifications') as string;
    const specifications = specificationsRaw ? JSON.parse(specificationsRaw) : {};

    const image = formData.get('image') as File;

    if (!name || !brand || !category_id || isNaN(price) || !image) {
      return { success: false, error: 'Required fields missing.' };
    }

    // 1. Generate slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // 2. Upload image to 'products' bucket
    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, image, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.error('Storage Upload Error:', uploadError.message);
      return { success: false, error: 'Failed to upload product image.' };
    }

    // 3. Get Public URL
    const { data: urlData } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    // 4. Insert row into 'products' table
    const { data, error: dbError } = await supabase
      .from('product')
      .insert({
        name,
        slug,
        brand,
        sku,
        category_id,
        price,
        discount,
        stock_quantity,
        stock_status,
        unit,
        short_description,
        description,
        is_active,
        is_best_seller,
        is_new,
        specifications,
        imageUrl,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database Insert Error:', dbError.message);
      return { success: false, error: dbError.message };
    }

    revalidatePath('/admin/categories');

    return { success: true, product: data };
  } catch (error: any) {
    console.error('Unexpected Error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred.' };
  }
}


export async function updateProduct(formData: FormData) {
  try {
    const supabase = createAdminClient();

    const idRaw = formData.get('id') as string;
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const sku = (formData.get('sku') as string) || null;
    const category_id_raw = formData.get('category_id') as string;
    const price = Number(formData.get('price'));
    const discount = Number(formData.get('discount') || 0);
    const stock_quantity = Number(formData.get('stock_quantity'));
    const stock_status = formData.get('stock_status') as string;
    const unit = (formData.get('unit') as string) || 'pcs';
    const short_description = (formData.get('short_description') as string) || null;
    const description = (formData.get('description') as string) || null;

    const is_active = formData.get('is_active') === 'true';
    const is_best_seller = formData.get('is_best_seller') === 'true';
    const is_new = formData.get('is_new') === 'true';

    const specificationsRaw = formData.get('specifications') as string;
    const specifications = specificationsRaw ? JSON.parse(specificationsRaw) : {};

    const image = formData.get('image') as File | null;

    if (!idRaw) {
      return { success: false, error: 'Product ID is required for updating.' };
    }

    if (!name || !brand || !category_id_raw || isNaN(price)) {
      return { success: false, error: 'Required fields missing.' };
    }

    const id = Number(idRaw);
    const category_id = Number(category_id_raw);

    // 1. Generate updated slug from product name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // 2. Prepare base payload for database update
    const updatePayload: Record<string, any> = {
      name,
      slug,
      brand,
      sku,
      category_id,
      price,
      discount,
      stock_quantity,
      stock_status,
      unit,
      short_description,
      description,
      is_active,
      is_best_seller,
      is_new,
      specifications,
    };

    // 3. Upload new image if provided
    if (image && image.size > 0) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, image, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        console.error('Storage Upload Error:', uploadError.message);
        return { success: false, error: 'Failed to upload product image.' };
      }

      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      updatePayload.imageUrl = urlData.publicUrl;
    }

    // 4. Update row in 'product' table
    const { data, error: dbError } = await supabase
      .from('product')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (dbError) {
      console.error('Database Update Error:', dbError.message);
      return { success: false, error: dbError.message };
    }

    revalidatePath('/admin/categories');

    return { success: true, product: data };
  } catch (error: any) {
    console.error('Unexpected Error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred.' };
  }
}


export async function deleteCategoryById(id:number) {
  const supabase = createAdminClient();

  // 1. Check if this category has any subcategories (where parent_id matches this id)
  const { data: subcategories, error: subcategoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('parent_id', id);

  if (subcategoryError) {
    throw new Error(`Failed to check subcategories: ${subcategoryError.message}`);
  }

  if (subcategories && subcategories.length > 0) {
    throw new Error('Cannot delete category: It contains one or more subcategories.');
  }

  // 2. Check if this category has any associated products
  const { data: products, error: productError } = await supabase
    .from('product')
    .select('id')
    .eq('category_id', id); // Adjust 'category_id' if your foreign key column in 'product' table is named differently

  if (productError) {
    throw new Error(`Failed to check associated products: ${productError.message}`);
  }

  if (products && products.length > 0) {
    throw new Error('Cannot delete category: It has existing products associated with it.');
  }

  // 3. Delete the category since both checks passed
  const { data, error: deleteError } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
    .select();

  if (deleteError) {
    throw new Error(`Failed to delete category: ${deleteError.message}`);
  }

  revalidatePath('/admin/categories');

  return { success: true, deletedCategory: data };
}


export async function deleteProductById(id:number) {
    const supabase = createAdminClient();

    const {data,error:deleteError}=await supabase
      .from("product")
      .delete()
      .eq("id",id)
      .select();

    if (deleteError) {
    throw new Error(`Failed to delete category: ${deleteError.message}`);
  }

  revalidatePath('/admin/categories');

  return { success: true, deletedProduct: data };

}