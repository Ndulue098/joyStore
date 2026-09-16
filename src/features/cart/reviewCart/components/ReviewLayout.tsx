"use client"
import { useTransition } from "react";
import ReviewCartForm from "./ReviewCartForm";
import ReviewProduct from "./ReviewProduct";


export default function ReviewLayout({}) {

    const [isPending, startTransition] = useTransition();
    

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <ReviewCartForm startTransition={startTransition}/>
        <ReviewProduct isPending={isPending}/>
    </div>
  );
}