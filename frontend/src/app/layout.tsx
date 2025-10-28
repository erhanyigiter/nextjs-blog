import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextBlog - Modern Blog Platformu",
  description: "Next.js 15 ve Turbo ile güçlendirilmiş, hızlı ve SEO dostu blog deneyimi. Çok dilli destek ve modern tasarım.",
  keywords: ["blog", "nextjs", "turbo", "seo", "modern", "web development"],
  authors: [{ name: "Erhan Yığiter" }],
  openGraph: {
    title: "NextBlog - Modern Blog Platformu",
    description: "Next.js 15 ve Turbo ile güçlendirilmiş, hızlı ve SEO dostu blog deneyimi.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextBlog - Modern Blog Platformu",
    description: "Next.js 15 ve Turbo ile güçlendirilmiş, hızlı ve SEO dostu blog deneyimi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
