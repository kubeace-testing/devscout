import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevScout Todo",
  description: "A small Next.js todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
