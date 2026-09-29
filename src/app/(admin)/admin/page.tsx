import OverviewPage from "@/src/features/admin/Overview/OverviewPage";
import { Metadata } from "next";
import { getAdminSession } from "../auth";

interface pageProps {
  
}

export const metadata: Metadata = {
  title: "Orders",
  description:"Create, delete, edit, and manage product and orders"
};

export default async function page({}: pageProps) {
  const session = await getAdminSession();
  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Welcome, {session?.user?.name}
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Manage, update, and track overall shop performance and status.
        </p>
      </div>

      {/* METRICS GRID */}
      <OverviewPage/>
    </div>
  );
}