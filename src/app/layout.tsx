import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/layout/NavBar";
import CartProvider from "../features/context/CartContext";
import { Toaster } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({ 
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // title: "%s Prowda",
  title:{
    template:"%s / Prowda",
    default:"Welcome to the Prowda store"
  },
  description: "Deals with all kind of electronic store, located at Enugu lagos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${geistSans.className} min-h-full flex flex-col bg-background text-foreground`}>
      <CartProvider>
        {children}
        <Toaster/>
      </CartProvider>
      </body>
    </html>)
} 