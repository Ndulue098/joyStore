import CategoriesPage from "@/src/features/admin/categories/CategoriesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
  description:"Create, delete, edit, and manage product and orders"
};

export default function page({}) {
  return (
    <div>
      <CategoriesPage/>
    </div>
  );
}