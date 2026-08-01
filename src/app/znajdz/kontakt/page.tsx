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
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-14 bg-gradient-to-b from-brand-100 to-brand-50">
        <div className="max-w-lg w-full text-center rounded-3xl bg-white border border-brand-200 p-8 md:p-10 shadow-sm">
          <div className="text-6xl">💛</div>
          <h1 className="wordmark mt-4 text-3xl sm:text-4xl text-brand-800">
            Dziękujemy!
          </h1>
          <p className="mt-4 text-brand-700 text-base sm:text-lg leading-relaxed">
            Zapisaliśmy Twoje zgłoszenie. Zadzwonimy do Ciebie w ciągu <strong>24 godzin</strong>
            {" "}— chcemy spokojnie porozmawiać o tym, jak możemy pomóc.
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

  // ---------- Formularz ----------
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-brand-100 to-brand-50">
      <div className="max-w-2xl mx-auto px-5 py-8 md:py-14">
        <Link
          href="/znajdz"
          className="text-sm text-brand-500 hover:text-brand-800"
        >
          ← Wróć
        </Link>

        <div className="mt-6 md:mt-10 text-center">
          <div className="text-5xl">☎️</div>
          <h1 className="wordmark mt-4 text-3xl sm:text-4xl md:text-5xl text-brand-800 leading-tight">
            Zaczynamy od rozmowy.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-700 max-w-xl mx-auto leading-relaxed">
            Zostaw numer, a <strong>zadzwonimy do Ciebie w ciągu 24 godzin</strong>.
            Spokojnie porozmawiamy o Waszej rodzinie i o tym, jak możemy pomóc.
          </p>
        </div>

        <div className="mt-8 md:mt-10 rounded-3xl bg-white border border-brand-200 p-6 md:p-8 shadow-sm">
          {/* Trzy uspokajające punkty */}
          <ul className="space-y-3 text-sm text-brand-700">
            <li className="flex items-start gap-3">
              <span className="text-lg shrink-0" aria-hidden>💛</span>
              <span>
                Zadzwoni do Ciebie <strong>ktoś od nas osobiście</strong> — nie call center, nie bot.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg shrink-0" aria-hidden>🕊️</span>
              <span>
                To zwykła rozmowa. <strong>Nic nie zamawiasz, do niczego się nie zobowiązujesz.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg shrink-0" aria-hidden>⏱️</span>
              <span>
                Odezwiemy się <strong>w ciągu 24 godzin</strong>, w porze, która Ci pasuje.
              </span>
            </li>
          </ul>

          {/* Formularz */}
          <form onSubmit={handleSubmit} className="mt-8">
            <label className="text-sm font-semibold text-brand-800">Twój numer telefonu</label>
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

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={!canSend || sending}
              className="mt-6 w-full rounded-full bg-warm-500 hover:bg-warm-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition"
            >
              {sending ? "Wysyłam..." : "Zadzwońcie do mnie →"}
            </button>

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
        </div>

        <p className="mt-6 text-center text-sm text-brand-600">
          Wolisz najpierw powiedzieć nam więcej?{" "}
          <Link
            href="/znajdz/kreator"
            className="text-warm-500 hover:text-warm-600 underline font-semibold"
          >
            Przejdź do kreatora
          </Link>
        </p>
      </div>
    </main>
  );
}
