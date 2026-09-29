import OrderPage from "@/src/features/order/OrderPage";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import CustomBreadcrumbs from "@/src/features/Components/CustomBreadcrumbs";

interface PageProps {
    params:Promise<{ orderId: string }>;

}


// export const metadata: Metadata = {
//   title: "Order",
// };


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { orderId } = await params;

  return {
    title: `Order #${orderId}`,
    description: `View details and tracking for order #${orderId}`,
  };
}

export default async function page({params}: PageProps) {
      const {orderId}=await params 
    
 
  return (
    <section className="mx-auto max-w-5xl w-full my-6 mt-10 ">
        <OrderPage orderId={orderId}/>
    </section>
  ); 
} 