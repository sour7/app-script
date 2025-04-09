import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discover Amazing Products | Your Store Name",
  description: "Explore our wide range of products and find the best deals on your favorite items. Shop now!",
};

// Add schema settings placeholder
// <script type="application/ld+json">
// {
//   "@context": "https://schema.org",
//   "@type": "Organization",
//   "name": "Your Store Name",
//   "url": "https://www.yourstore.com",
//   "logo": "https://www.yourstore.com/logo.png"
// }
// </script>

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar  />
        {children}
        <Footer />
      </body>
    </html>
  );
}
