import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/css/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assigment",
  description: "Twendee Task Assigment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "my-3.5 md:my-5")}>{children}</body>
    </html>
  );
}
