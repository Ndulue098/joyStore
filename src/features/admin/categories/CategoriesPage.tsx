import { PlusCircle } from "lucide-react";
import Button from "./components/Button";
import CategoryCard from "./components/CategoryCard";
import CateForm from "./components/CateForm";
import ProductForm from "./components/ProductForm";
import { getCategoriesSubcategoriesAndProducts, getComponent } from "./data/getComponent";
import ParentCard from "./components/ParentCard";


export default async function CategoriesPage({}) {
  // const categories= await getComponent()

  // const categoryList = categories ?? []

  const categoriesParent=await getCategoriesSubcategoriesAndProducts()
  console.log("categoriesParent ",categoriesParent);
  
  // const categoryList=categoriesParent?.subcategories || []

  if(categoriesParent.length===0){
    return  <div className="p-4 rounded-lg bg-neutral-100 text-neutral-500 text-sm text-center">
      No categories available.
    </div>
  }

   
  

  return ( 

    <div>
     <div className="flex items-center justify-between mb-12">
        <div className="">
        <h2 className="text-3xl font-bold">Categories & Subset Products</h2>
        <p className="text-xs text-neutral-500">Categories contain all products under them. Select or expand a category to manage and add its products.</p> 
        </div>
        
        <CateForm categoryParentList={categoriesParent}>

          <span>
            <Button icon={true}>Add Category</Button>
          </span>
        </CateForm>
     </div>

      <div className="flex flex-col gap-4">
          {/* Parent categories */}
          {categoriesParent.map((cartParent)=><ParentCard categoriesParent={categoriesParent} parent={cartParent} key={cartParent.id}/>)}
      </div>

{/* 
      <div className="flex flex-col gap-2">
        {categoryList?.map((category)=><CategoryCard categoryList={categoryList} key={category.id} category={category}/>)}
      </div> */}

      
      <ProductForm />


    </div> 
  );
}