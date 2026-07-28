"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDB } from "@/lib/hooks";
import { currentUser, loginOrRegister, type Role } from "@/lib/store";

export default function Home() {
  const db = useDB();
  const router = useRouter();
  const me = currentUser(db);

  const [role, setRole] = useState<Role>("klient");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("Warszawa");

  useEffect(() => {
    if (me) {
      router.push(me.role === "klient" ? "/klient" : "/bliski");
    }
  }, [me, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) return;
    const u = loginOrRegister(email, role, fullName, city);
    router.push(u.role === "klient" ? "/klient" : "/bliski");
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-14">
      <div className="text-center">
        <h1 className="wordmark text-5xl md:text-6xl text-brand-800">bliscy</h1>
        <p className="mt-4 text-brand-600 max-w-xl mx-auto">
          Demo lokalne aplikacji. Wybierz rolę, załóż profil (dane trzymane tylko w Twojej przeglądarce)
          i zobacz jak wygląda flow klienta oraz Bliskiego.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto bg-white rounded-3xl border border-brand-200 p-8 shadow-sm">
        <h2 className="font-bold text-xl">Zaloguj się / załóż konto</h2>
        <p className="text-sm text-brand-600 mt-1">Bez maili, bez hasła — to demo.</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("klient")}
            className={`rounded-2xl border-2 p-4 text-left ${role === "klient" ? "border-warm-500 bg-warm-100/40" : "border-brand-200"}`}
          >
            <div className="text-2xl">👨‍👩‍👧</div>
            <div className="mt-2 font-semibold">Klient</div>
            <div className="text-xs text-brand-600">szukam wsparcia dla bliskiej osoby</div>
          </button>
          <button
            type="button"
            onClick={() => setRole("bliski")}
            className={`rounded-2xl border-2 p-4 text-left ${role === "bliski" ? "border-warm-500 bg-warm-100/40" : "border-brand-200"}`}
          >
            <div className="text-2xl">🤝</div>
            <div className="mt-2 font-semibold">Bliski</div>
            <div className="text-xs text-brand-600">chcę pomagać seniorom</div>
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Imię i nazwisko"
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail (identyfikator)"
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3"
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Miasto"
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3"
          />
        </div>

        <button className="mt-6 w-full rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3">
          Wejdź do panelu
        </button>
      </form>

      <div className="mt-10 text-center text-xs text-brand-500">
        Tip: możesz założyć dwie sesje (np. w innej przeglądarce lub incognito) — jedną jako klient, drugą jako Bliski.
      </div>

      <div className="mt-6 text-center">
        <Link href="/znajdz" className="text-sm text-warm-500 hover:text-warm-600 underline font-semibold">
          Nie chcesz zakładać konta? Zobacz publiczną wyszukiwarkę →
        </Link>
      </div>
    </main>
  );
}
