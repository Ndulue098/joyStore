import { createClient } from "@/lib/supabase/server";

export async function getOrderById(public_code:string){
   const supabase=await createClient()
  const {data,error}=await supabase
    .from("orders")
    .select('* , order_items(*)')
    .eq("public_code",public_code)
    .single()

    if(error){
        console.error("Error fetching order by public code:", error.message);
        return null;
    }

    return data

} 