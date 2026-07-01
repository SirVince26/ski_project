import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { CompareProvider } from "@/components/resort/compare-context";
import { CompareBar } from "@/components/resort/compare-bar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corduroy | Find your perfect ski trip",
  description: "AI-powered ski trip planning, recommendations, and cost estimation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CompareProvider>
          <Header />
          {children}
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}
