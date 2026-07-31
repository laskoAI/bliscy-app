"use client";

import Link from "next/link";

export default function LegalLayout({
  title,
  version,
  children,
}: {
  title: string;
  version: string;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-3xl mx-auto px-5 py-10 md:py-14">
      <Link
        href="/znajdz"
        className="text-sm text-brand-500 hover:text-brand-800"
      >
        ← Powrót
      </Link>
      <h1 className="wordmark mt-4 text-3xl sm:text-4xl md:text-5xl text-brand-800">
        {title}
      </h1>
      <p className="mt-2 text-sm text-brand-500">Wersja z {version}</p>

      <div className="mt-8 space-y-6 text-brand-800 leading-relaxed prose-legal">
        {children}
      </div>

      <div className="mt-14 pt-6 border-t border-brand-200 flex flex-wrap items-center justify-between gap-3 text-xs text-brand-500">
        <div>
          © {new Date().getFullYear()}{" "}
          <span className="wordmark">bliscy</span> · Warszawa
        </div>
        <div className="flex items-center gap-5">
          <Link href="/regulamin" className="hover:text-brand-800">
            Regulamin
          </Link>
          <Link
            href="/polityka-prywatnosci"
            className="hover:text-brand-800"
          >
            Polityka prywatności
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .prose-legal h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #2b2417;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        .prose-legal p {
          margin: 0.75rem 0;
          color: #3d3121;
        }
        .prose-legal ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }
        .prose-legal ul li {
          margin: 0.35rem 0;
          color: #3d3121;
        }
        .prose-legal a {
          color: #c8622f;
          text-decoration: underline;
        }
        .prose-legal a:hover {
          color: #a94f22;
        }
        .prose-legal strong {
          color: #2b2417;
        }
        .prose-legal .callout {
          background: #f5efe4;
          border-left: 4px solid #e8a15b;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          margin: 1rem 0;
        }
      `}</style>
    </main>
  );
}
