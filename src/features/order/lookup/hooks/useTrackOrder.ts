"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

// 1. Define strong types for Order and Error
export interface Order {
  id: string;
  public_code: string;
  total_price?: number;
  status?: string;
  created_at?: string;
  // Add other known order fields here
}

export interface FetchOrderError {
  message: string;
  code?: string;
}

// 2. Define the exact shape returned when an object is present
export type GetOrderResult = {
  data: Order | null;
  error: FetchOrderError | Error | string | null;
};

// 3. Update the function signature to allow `| null` at the root
export type GetOrderByIdFn = (
  public_code: string
) => Promise<GetOrderResult | null>;

export default function useTrackOrder(getOrderById: GetOrderByIdFn) {
  const [orderCode, setOrderCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedCode = orderCode.trim();
    if (!trimmedCode) return;

    setLoading(true);
    setError(false);

    try {
      const result = await getOrderById(trimmedCode);

      // Safe check covering both null return and null data
      if (result?.data) {
        router.push(`/order/${trimmedCode}`);
      } else {
        setError(true);
      }
    } catch (err: unknown) {
      console.error("Tracking order error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return { error, loading, handleSubmitForm, setOrderCode, orderCode, setError };
}