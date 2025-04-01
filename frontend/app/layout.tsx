// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "@/components/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogiFlow",
  description: "Discover the best cars in the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-background text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
