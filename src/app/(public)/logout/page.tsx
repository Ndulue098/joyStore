import Link from "next/link";
import { LogOut, ArrowLeft } from "lucide-react";
import { signoutAction } from "./action";

export default function SignOutPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg border border-neutral-200/80 shadow-xl shadow-neutral-100/60 p-8 sm:p-10 text-center">
        
        {/* Title & Description */}
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
          Sign Out of Admin Portal
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-neutral-500 font-medium">
          Are you sure you want to end your session? You will need to sign in again to access the dashboard.
        </p>

        {/* Sign-Out Action Form */}
        <form action={signoutAction} className="mt-8 space-y-3">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm shadow-xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-600/20 active:scale-[0.99] cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Confirm Sign Out</span>
          </button>

          {/* Cancel / Return Button */}
          <Link
            href="/admin"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-sm transition-all duration-150 active:scale-[0.99]"
          >
            <ArrowLeft className="h-4 w-4 text-neutral-400" />
            <span>Cancel & Go Back</span>
          </Link>
        </form>

        {/* Footer Note */}
        <p className="mt-8 text-[11px] text-neutral-400 font-medium">
          Your session and permissions will be cleared securely upon signing out.
        </p>

      </div>
    </div>
  );
}