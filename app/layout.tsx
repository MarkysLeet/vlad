import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "P. Typography 2025",
  description: "Tactile Digitalism. Industrial precision with messenger ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased relative min-h-screen`}>
         {/* Global Noise Overlay */}
        <div className="fixed inset-0 z-50 bg-noise opacity-50 pointer-events-none mix-blend-multiply" />
        {children}
      </body>
    </html>
  );
}
