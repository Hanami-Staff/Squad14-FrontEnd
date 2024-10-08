import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components";
import { DialogProvider } from "@/context/dialogContext";
import { AppProvider } from "@/context/appContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Squad 14 - Hanami",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <DialogProvider>
            <Navbar />
            {children}
          </DialogProvider>
        </AppProvider>
      </body>
    </html>
  );
}
