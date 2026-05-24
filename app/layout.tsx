import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InteractiveLayer from "@/components/InteractiveLayer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jatin Aggarwal — Backend Engineer",
  description: "Portfolio of Jatin Aggarwal — SWE at Salesforce, specializing in Generative AI, LLMs, and ML systems.",
  openGraph: {
    title: "Jatin Aggarwal — Backend Engineer",
    description: "Building intelligent systems at Salesforce. GenAI, LLMs, FastAPI, and more.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <InteractiveLayer />
        {children}
      </body>
    </html>
  );
}
