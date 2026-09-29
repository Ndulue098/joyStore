import { Lock } from "lucide-react"; // Optional: install lucide-react if not already present
import { signinAction } from "./action";

export default async function LoginPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200/80 shadow-xl shadow-neutral-100 p-8 sm:p-10 text-center">
        {/* Header Icon & Badge */}
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 border border-amber-200/60 text-amber-600">
          <Lock className="h-5 w-5" />
        </div>

        {/* Title & Description */}
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
          Admin Portal
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-neutral-500 font-medium">
          Sign in with your authorized admin account to access the control center.
        </p>

        {/* Google Sign-In Action Form */}
        <form action={signinAction} className="mt-8">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-sm shadow-xs transition-all duration-150 hover:shadow-md hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 active:scale-[0.99] cursor-pointer"
          >
            <img
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google Logo"
              height="20"
              width="20"
              className="h-5 w-5 shrink-0"
            />
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Footer Security Note */}
        <p className="mt-8 text-[11px] text-neutral-400 font-medium">
          Access is restricted strictly to designated administrator emails.
        </p>
      </div>
    </div>
  );
}