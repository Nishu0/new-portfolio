import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nisarg Thakkar | Systems & Infrastructure",
  description:
    "I build the systems that make products scale: backend infrastructure, distributed systems, and the interfaces on top. Based in Bangalore, open to full-time roles and contract engagements.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Nisarg Thakkar | Systems & Infrastructure",
    description:
      "I build the systems that make products scale. Based in Bangalore, open to full-time roles and contract engagements.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nisarg Thakkar | Systems & Infrastructure",
    description:
      "I build the systems that make products scale. Based in Bangalore, open to full-time roles and contract engagements.",
    creator: "@itsnishutwt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${nunitoSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
