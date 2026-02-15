import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const articulat = localFont({
  src: "../public/font/Articulat_CF_Demi_Bold.ttf",
  variable: "--font-articulat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "nisarg thakkar's diary",
  description: "Nisarg Thakkar is a Web3 Developer based out of India.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "nisarg thakkar's diary",
    description: "Nisarg Thakkar is a Web3 Developer based out of India.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nisarg thakkar's diary",
    description: "Nisarg Thakkar is a Web3 Developer based out of India.",
    creator: "@itsnishu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${articulat.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
