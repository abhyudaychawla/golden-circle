import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TGC El Dorado | Mean Reversion System — The Golden Circle",
  description:
    "The complete TCM Mean Reversion trading system. Backed by 9 years of data. 2,185 sessions analysed. 87.6% TP rate when aligned. Get free access.",
  keywords: [
    "mean reversion trading",
    "NQ futures",
    "gold futures",
    "trading system",
    "TCM mean reversion",
    "The Golden Circle",
    "El Dorado",
  ],
  openGraph: {
    title: "TGC El Dorado | Mean Reversion System",
    description:
      "The complete TCM Mean Reversion trading system — backed by 9 years of data.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TGC El Dorado | Mean Reversion System",
    description:
      "The complete TCM Mean Reversion trading system — backed by 9 years of data.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Load fonts in the browser — avoids build-time network dependency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
