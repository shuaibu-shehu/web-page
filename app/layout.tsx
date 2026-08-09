import type React from "react";
import "./globals.css";
import { Manrope, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  // next/font ships no fallback metrics for Newsreader; skip the size-adjust step.
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "CodeTherapy",
  description:
    "Pioneering open-source AI diagnostics designed for and with frontline health workers in underserved communities across Africa and globally.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`}>
      <head>
        {/*
          Opt in to scroll reveals before first paint. Runs only when JS is
          available and the visitor has not asked for reduced motion — so the
          hidden start states in globals.css can never strand content.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("js-reveal")}}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-cream font-sans text-ink antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
