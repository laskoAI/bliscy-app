"use client";

import Link from "next/link";
import { useState } from "react";
import { submitPhoneLead } from "@/lib/supabase";

export default function KontaktPage() {
  const [phone, setPhone] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>("");
  const [sent, setSent] = useState(false);

  function handlePhoneChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 9);
    const formatted = digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
    setPhone(formatted);
  }

  const canSend = phone.replace(/\D/g, "").length === 9;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 9) {
      setError("Numer musi mieć dokładnie 9 cyfr.");
      return;
    }
    setError("");
    setSending(true);
    const res = await submitPhoneLead({
      phone: `+48${digits}`,
      city: "Warszawa",
      source: typeof window !== "undefined" ? window.location.href : undefined,
    });
    setSending(false);
    if (!res.ok) {
      setError("Coś poszło nie tak. Spróbuj ponownie za chwilę.");
      return;
    }
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Widok potwierdzenia ----------
  if (sent) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-14">
        <div className="max-w-lg w-full text-center rounded-3xl bg-white border border-brand-200 p-8 md:p-10 shadow-sm">
          <div className="text-6xl">💛</div>
          <h1 className="wordmark mt-4 text-3xl sm:text-4xl text-brand-800">Dziękujemy!</h1>
          <p className="mt-4 text-brand-700 leading-relaxed">
            Zapisaliśmy Twoje zgłoszenie. Zadzwonimy do Ciebie w ciągu <strong>24 godzin</strong>
            {" "}- chcemy poznać Twoje potrzeby i wspólnie zbudować lepszą usługę.
          </p>
          <p className="mt-3 text-sm text-brand-600">
            Nie musisz się już nigdzie klikać. Odezwiemy się sami.
          </p>
          <Link
            href="/znajdz"
            className="mt-6 inline-block text-sm text-warm-500 hover:text-warm-600 underline font-semibold"
          >
            ← Wróć na stronę główną
          </Link>
        </div>
      </main>
    );
  }

  // ---------- Widok formularza - layout jak w kreatorze ----------
  return (
    <main className="min-h-[calc(100vh-4rem)] px-5 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Nagłówek - spójny z kreatorem, ale bez progress bara */}
        <div className="flex items-center justify-between text-sm text-brand-600">
          <Link href="/znajdz" className="hover:text-brand-800">← Wyjdź</Link>
        </div>

        {/* Karta - dokładnie jak krok kreatora */}
        <form id="kontakt-form" onSubmit={handleSubmit} className="mt-6 rounded-3xl bg-white border border-brand-200 p-6 md:p-8 shadow-sm">
          {/* Logo bliscy */}
          <div className="flex justify-center" aria-hidden>
            <svg viewBox="0 0 120 120" width="64" height="64">
              <path d="M8 108 C 10 82, 22 72, 40 74 L 52 74 L 52 108 Z" fill="#c8622f"/>
              <circle cx="38" cy="52" r="20" fill="#e8a15b"/>
              <path d="M20 48 C 22 32, 34 28, 46 30 C 50 31, 55 34, 56 42 C 50 38, 42 37, 34 40 C 28 42, 24 45, 20 48 Z" fill="#f5efe4"/>
              <path d="M112 108 C 110 82, 98 72, 80 74 L 68 74 L 68 108 Z" fill="#4b6b3a"/>
              <circle cx="82" cy="52" r="20" fill="#e8a15b"/>
              <path d="M64 46 C 66 30, 78 26, 92 30 C 100 32, 104 40, 102 50 C 96 42, 86 40, 78 44 C 72 46, 68 46, 64 46 Z" fill="#2b2417"/>
              <path d="M60 60 C 55 55, 50 58, 52 64 C 54 70, 60 74, 60 78 C 60 74, 66 70, 68 64 C 70 58, 65 55, 60 60 Z" fill="#c8622f"/>
            </svg>
          </div>

          <h1 className="wordmark mt-4 text-2xl sm:text-3xl text-brand-800 text-center">
            Zaczynamy od rozmowy.
          </h1>
          <p className="mt-3 text-brand-700 text-center">
            Zostaw numer, a <strong>zadzwonimy do Ciebie w ciągu 24 godzin</strong>.
            Chcemy poznać Twoje potrzeby i wspólnie zbudować lepszą usługę.
          </p>

          {/* Trzy uspokajające punkty - jak "hint" w kreatorze */}
          <div className="mt-6 rounded-2xl bg-brand-50 border border-brand-200 p-4">
            <ul className="space-y-3 text-sm text-brand-700">
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0" aria-hidden>💛</span>
                <span>
                  Zadzwoni do Ciebie <strong>ktoś od nas osobiście</strong> - nie call center, nie bot.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0" aria-hidden>🕊️</span>
                <span>
                  To zwykła rozmowa. <strong>Nic nie zamawiasz, do niczego się nie zobowiązujesz.</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0" aria-hidden>🤝</span>
                <span>
                  Chcemy <strong>poznać Twoje potrzeby</strong> - na ich podstawie budujemy
                  lepszą wersję <em>bliscy</em>.
                </span>
              </li>
            </ul>
          </div>

          {/* Pole telefonu - dokładnie jak w kreatorze */}
          <div className="mt-6">
            <label className="text-sm font-semibold">Numer telefonu</label>
            <div className="mt-2 flex items-stretch rounded-xl border border-brand-200 focus-within:border-warm-400 focus-within:ring-4 focus-within:ring-warm-100 overflow-hidden bg-white">
              <span className="flex items-center justify-center px-4 bg-brand-100 text-brand-700 font-semibold text-lg select-none border-r border-brand-200">
                +48
              </span>
              <input
                required
                autoFocus
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="XXX XXX XXX"
                className="flex-1 min-w-0 px-4 py-4 text-lg focus:outline-none tracking-wider"
              />
            </div>
            <p className="mt-2 text-xs text-brand-500">
              {phone.replace(/\D/g, "").length}/9 cyfr
            </p>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          {/* Nota RODO - spójna z kreatorem */}
          <p className="mt-4 text-xs text-brand-500 leading-relaxed">
            Zostawiając numer, zgadzasz się na kontakt telefoniczny w sprawie Twojego zgłoszenia.
          </p>
          <p className="mt-2 text-xs text-brand-500 leading-relaxed">
            Administratorem danych są Norbert Laskowski i Mikołaj Komorek (kontakt:{" "}
            <a href="mailto:bliscykontakt@gmail.com" className="underline hover:text-brand-800">
              bliscykontakt@gmail.com
            </a>
            ). Masz prawo dostępu do danych, ich sprostowania oraz usunięcia. Szczegóły w{" "}
            <Link href="/polityka-prywatnosci" className="underline hover:text-brand-800">
              Polityce Prywatności
            </Link>{" "}
            i{" "}
            <Link href="/regulamin" className="underline hover:text-brand-800">
              Regulaminie
            </Link>.
          </p>
        </form>

        {/* Przycisk główny - poza kartą, jak w nawigacji kreatora */}
        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            form="kontakt-form"
            disabled={!canSend || sending}
            className="rounded-xl bg-warm-500 hover:bg-warm-600 disabled:opacity-50 text-white font-semibold px-8 py-4 text-lg w-full sm:w-auto"
          >
            {sending ? "Wysyłam..." : "Zgłoś się - oddzwonimy w 24h"}
          </button>
        </div>
      </div>
    </main>
  );
}
