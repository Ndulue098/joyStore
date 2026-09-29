"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";


type GetOrderResult = {
  data?: any;
  error?: any;
};

type GetOrderByIdFn = (id: string) => Promise<GetOrderResult>;

export default function useTrackOrder(getOrderById:GetOrderByIdFn) {
  const [orderCode, setOrderCode] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      
      if (!orderCode.trim()) return;
  
      setLoading(true);
      setError(false);
  
    try{

      const { data, error: fetchError } = await getOrderById(orderCode.trim());
      
      if (data) {
        router.push(`/order/${orderCode.trim()}`);
      } else if (fetchError || !data) {
        setError(true);
        setLoading(false);
      }
    } catch(err){
        setError(true);
    } finally {
      setLoading(false); // Guarantees loading resets whether successful or failing
    } 
    }

    return {error,loading,handleSubmitForm,setOrderCode,orderCode,setError}
 
}
