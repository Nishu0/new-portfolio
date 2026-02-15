import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import OnekoCat from "@/components/onekoCat";

const articulat = localFont({
  src: "../public/font/Articulat_CF_Demi_Bold.ttf",
  variable: "--font-articulat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nisarg",
  description: "Nisarg's portfolio",
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
        <OnekoCat />
      </body>
    </html>
  );
}
