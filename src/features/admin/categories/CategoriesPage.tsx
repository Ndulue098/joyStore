import Button from "./components/Button";
import CateForm from "./components/CateForm";
import ProductForm from "./components/ProductForm";
import { getCategoriesSubcategoriesAndProducts } from "./data/getComponent";
import ParentCard from "./components/ParentCard";
import { FolderPlus } from "lucide-react";


export default async function CategoriesPage({}) {
  // const categories= await getComponent()

  // const categoryList = categories ?? []

  const categoriesParent=await getCategoriesSubcategoriesAndProducts()
  console.log("categoriesParent ",categoriesParent);
  
  // const categoryList=categoriesParent?.subcategories || []   
  

  return ( 

    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/60 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Categories & Subset Products
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Categories contain all products under them. Select or expand a category to manage and add its products.
          </p>
        </div>

        {/* Add Category Action */}
        <div className="shrink-0 self-start sm:self-auto">
          <CateForm categoryParentList={categoriesParent}>
            <span>
              <Button icon={true}>Add Category</Button>
            </span>
          </CateForm>
        </div>
      </div>

      {/* Parent Categories List */}
      {categoriesParent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900">
          <div className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 mb-3">
            <FolderPlus className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
            No categories created yet
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs">
            Start structuring your shop by clicking the &quot;Add Category&quot; button above.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {categoriesParent.map((cartParent) => (
            <ParentCard
              key={cartParent.id}
              categoriesParent={categoriesParent}
              parent={cartParent}
            />
          ))}
        </div>
      )}

      {/* Product Form Modal / Sheet Container */}
      <ProductForm />
    </div>
  );
}