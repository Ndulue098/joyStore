import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ADMIN_EMAILS = ["christianndulue47@gmail.com"];

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // Required for v5 host detection
  secret: process.env.AUTH_SECRET, // Make sure AUTH_SECRET is set in .env.local
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userEmail = user?.email?.toLowerCase();
      // Block non-admin emails before session creation
      return Boolean(userEmail && ADMIN_EMAILS.includes(userEmail));
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn:"/login",
    error: "/api/auth/signin?error=AccessDenied",
  },
});

export const getAdminSession = () => auth();