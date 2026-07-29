"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useDB } from "@/lib/hooks";
import { currentUser, logout, resetDB } from "@/lib/store";

export default function Nav() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const isPublic = pathname.startsWith("/znajdz");

  function handleLogout() {
    logout();
    router.push("/");
  }

  function handleReset() {
    if (confirm("Zresetować dane w tej przeglądarce? Wrócisz do stanu początkowego.")) {
      resetDB();
      router.push("/");
    }
  }

  return (
    <nav className="border-b border-brand-200 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href={isPublic ? "/znajdz" : (me ? (me.role === "klient" ? "/klient" : "/bliski") : "/")} className="flex items-center gap-2">
          <svg viewBox="0 0 120 120" width="32" height="32">
            <path d="M8 108 C 10 82, 22 72, 40 74 L 52 74 L 52 108 Z" fill="#c8622f"/>
            <circle cx="38" cy="52" r="20" fill="#e8a15b"/>
            <path d="M20 48 C 22 32, 34 28, 46 30 C 50 31, 55 34, 56 42 C 50 38, 42 37, 34 40 C 28 42, 24 45, 20 48 Z" fill="#f5efe4"/>
            <path d="M112 108 C 110 82, 98 72, 80 74 L 68 74 L 68 108 Z" fill="#4b6b3a"/>
            <circle cx="82" cy="52" r="20" fill="#e8a15b"/>
            <path d="M64 46 C 66 30, 78 26, 92 30 C 100 32, 104 40, 102 50 C 96 42, 86 40, 78 44 C 72 46, 68 46, 64 46 Z" fill="#2b2417"/>
            <path d="M60 60 C 55 55, 50 58, 52 64 C 54 70, 60 74, 60 78 C 60 74, 66 70, 68 64 C 70 58, 65 55, 60 60 Z" fill="#c8622f"/>
          </svg>
          <span className="wordmark text-2xl">bliscy</span>
        </Link>
        <div className="flex items-center gap-4">
          {isPublic ? (
            <Link href="/znajdz/kreator" className="rounded-full bg-warm-500 hover:bg-warm-600 text-white text-sm font-semibold px-4 py-2">
              Zaczynamy →
            </Link>
          ) : me ? (
            <>
              <span className="text-sm text-brand-600 hidden sm:inline">
                {me.fullName} · <span className="text-brand-400">{me.role}</span>
              </span>
              <button onClick={handleReset} className="text-xs text-brand-500 hover:text-brand-800">Reset</button>
              <button onClick={handleLogout} className="text-sm text-brand-700 hover:text-brand-900">Wyloguj</button>
            </>
          ) : (
            <button onClick={handleReset} className="text-xs text-brand-500 hover:text-brand-800">Reset</button>
          )}
        </div>
      </div>
    </nav>
  );
}
