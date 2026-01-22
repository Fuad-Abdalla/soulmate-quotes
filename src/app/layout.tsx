import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "SoulMate Quotes",
    template: "%s | SoulMate Quotes",
  },
  description:
    "SoulMate Quotes — daily love quotes, soulmate lines, and relationship wisdom.",
  robots: { index: true, follow: true },
  verification: {
    google: "TaX5MnStJbp3AT_W_glrJjXNq026cszycAY3U1J6Bsk",
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        
          <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <Header />
            <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
            <Footer />
          </div>
       
      </body>
    </html>
  );
}
