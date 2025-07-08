import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/Header";

export const metadata: Metadata = {
  title: "VCR - Verified Chain Resume | Web3 Professional Network",
  description: "The premier professional network for Web3. Build your decentralized identity, connect with Web3 professionals, and discover opportunities in the blockchain ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}