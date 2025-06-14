import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PerfumeProvider } from "@/contexts/PerfumeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zafra - Premium Perfumes & Fragrances",
  description: "Discover luxury perfumes and designer fragrances at Zafra. Shop from top brands with fast delivery in Dhaka, Bangladesh.",
  keywords: "perfume, fragrance, luxury perfumes, designer fragrance, Bangladesh, Dhaka, online perfume shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <AuthProvider>
            <PerfumeProvider>
              {children}
            </PerfumeProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
