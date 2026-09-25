import LookupPage from "@/src/features/order/lookup/LookupPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Look Up",
  description:" look up orders"
};


export default function page({}) {
  return (
    <section className="min-h-[calc(100dvh-64px)] h-full flex items-center">
      <LookupPage/>
    </section>
  );
}