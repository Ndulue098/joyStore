
import { getCategoriesSubcategoriesAndProducts } from "@/src/features/admin/categories/data/getComponent";
import CategoryCard from "./CategoryCard";


export default async function CategoryCardsContainer({}) {

    const data=await getCategoriesSubcategoriesAndProducts()
    const dataLength=data || []

    console.log("getCategoriesSubcategoriesAndProducts,  ,",dataLength);
    

  return (
    <>
      {dataLength.map((subcat)=><CategoryCard subcat={subcat} key={subcat.id}/>)}
    </>
  );
}