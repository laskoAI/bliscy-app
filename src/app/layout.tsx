import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "bliscy — panel demo",
  description: "Panel klienta i Bliskiego (demo lokalne)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Nav />
        {children}
        <footer className="max-w-5xl mx-auto px-5 py-10 text-xs text-brand-500">
          Wersja demo lokalna. Dane trzymane tylko w Twojej przeglądarce (localStorage).
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
