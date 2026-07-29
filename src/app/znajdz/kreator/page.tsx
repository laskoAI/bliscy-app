"use client";

import Link from "next/link";
import { useState } from "react";
import { submitPhoneLead } from "@/lib/supabase";

// ------------------------------
// Konfiguracja
// ------------------------------
const RELATIONS = [
  { key: "mama",    label: "Mama",       emoji: "👩" },
  { key: "tata",    label: "Tata",       emoji: "👨" },
  { key: "babcia",  label: "Babcia",     emoji: "👵" },
  { key: "dziadek", label: "Dziadek",    emoji: "👴" },
  { key: "siebie",  label: "Dla siebie", emoji: "🙂" },
  { key: "inny",    label: "Ktoś inny",  emoji: "🫶" },
] as const;

const AGE_RANGES = [
  { key: "60-70", label: "60–70 lat", emoji: "🌿" },
  { key: "70-80", label: "70–80 lat", emoji: "🍂" },
  { key: "80+",   label: "80+ lat",   emoji: "🌸" },
] as const;

const NEEDS = [
  { key: "Rozmowa",             label: "Towarzystwo i rozmowa", emoji: "☕" },
  { key: "Spacer",              label: "Spacery",               emoji: "🚶" },
  { key: "Wyprowadzanie psa",   label: "Wyprowadzić psa",       emoji: "🐕" },
  { key: "Zakupy",              label: "Zakupy",                emoji: "🛒" },
  { key: "Apteka i leki",       label: "Apteka i leki",         emoji: "💊" },
  { key: "Transport do lekarza",label: "Wizyta u lekarza",      emoji: "🏥" },
  { key: "Sprawy urzędowe",     label: "Sprawy urzędowe",       emoji: "📋" },
  { key: "Wspólny posiłek",     label: "Wspólny posiłek",       emoji: "🍲" },
  { key: "Gry i pasje",         label: "Wspólne pasje",         emoji: "🎲" },
  { key: "Pomoc z telefonem",   label: "Pomoc z telefonem",     emoji: "📱" },
  { key: "Inne",                label: "Coś innego",            emoji: "✍️" },
] as const;

type StepId = 0 | 1 | 2 | 3 | 4;

const STEPS: { id: StepId; label: string }[] = [
  { id: 0, label: "Dla kogo" },
  { id: 1, label: "Wiek" },
  { id: 2, label: "Potrzeby" },
  { id: 3, label: "Kontakt" },
];

export default function KreatorPage() {
  const [step, setStep] = useState<StepId>(0);

  // Wybory kreatora
  const [relation, setRelation] = useState<string>("");
  const [ageRange, setAgeRange] = useState<string>("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [otherNeed, setOtherNeed] = useState<string>("");
  const city = "Warszawa"; // na razie tylko Warszawa

  // Kontakt
  const [phone, setPhone] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>("");
  const [sent, setSent] = useState(false);

  function toggleNeed(k: string) {
    setNeeds((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  }

  const canGoNext = (() => {
    if (step === 0) return relation !== "";
    if (step === 1) return ageRange !== "";
    if (step === 2) return needs.length > 0;
    if (step === 3) return phone.trim().length > 0;
    return true;
  })();

  async function goNext() {
    if (step < 3) {
      setStep((s) => Math.min(4, (s + 1)) as StepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Krok 3 → wyślij zgłoszenie
    if (sending) return;
    setError("");
    setSending(true);
    const res = await submitPhoneLead({
      phone: phone.trim(),
      relation: relation || undefined,
      age_range: ageRange || undefined,
      needs: needs.length ? needs : undefined,
      other_need: otherNeed.trim() || undefined,
      city,
      source: typeof window !== "undefined" ? window.location.href : undefined,
    });
    setSending(false);
    if (!res.ok) {
      setError("Coś poszło nie tak. Spróbuj ponownie za chwilę.");
      return;
    }
    setSent(true);
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    if (step === 0) return;
    setStep((s) => Math.max(0, s - 1) as StepId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Widok potwierdzenia ----------
  if (sent && step === 4) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-14">
        <div className="max-w-lg w-full text-center rounded-3xl bg-white border border-brand-200 p-8 md:p-10 shadow-sm">
          <div className="text-6xl">💛</div>
          <h1 className="wordmark mt-4 text-3xl sm:text-4xl text-brand-800">Dziękujemy!</h1>
          <p className="mt-3 text-brand-700">
            Zapisaliśmy Twoje zgłoszenie. Zadzwonimy do Ciebie w ciągu <strong>24 godzin</strong> i pomożemy
            znaleźć Bliskiego dopasowanego do Waszych potrzeb.
          </p>
          <div className="mt-6 rounded-2xl bg-brand-50 border border-brand-200 p-4 text-sm text-brand-700">
            📞 Odezwiemy się z numeru rozpoczynającego się od <strong>+48</strong>
          </div>
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

  // ---------- Widok kreatora ----------
  return (
    <main className="min-h-[calc(100vh-4rem)] px-5 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Nagłówek + progress */}
        <div className="flex items-center justify-between text-sm text-brand-600">
          <Link href="/znajdz" className="hover:text-brand-800">← Wyjdź</Link>
          <span>
            Krok <strong className="text-brand-800">{step + 1}</strong> z {STEPS.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 rounded-full bg-brand-200 overflow-hidden">
          <div
            className="h-full bg-warm-500 transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Etykiety kroków (mini step indicator) */}
        <div className="mt-3 hidden sm:flex items-center justify-between text-xs">
          {STEPS.map((s, i) => (
            <span
              key={s.id}
              className={`${i <= step ? "text-warm-500 font-semibold" : "text-brand-400"}`}
            >
              {s.label}
            </span>
          ))}
        </div>

        {/* Karta z krokiem */}
        <div className="mt-6 rounded-3xl bg-white border border-brand-200 p-6 md:p-8 shadow-sm">
          {/* KROK 0 — dla kogo */}
          {step === 0 && (
            <>
              <h1 className="wordmark text-2xl sm:text-3xl text-brand-800">
                Dla kogo szukasz Bliskiego?
              </h1>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {RELATIONS.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setRelation(r.key)}
                    className={`rounded-2xl border-2 p-4 text-left ${relation === r.key ? "border-warm-500 bg-warm-100/40" : "border-brand-200"}`}
                  >
                    <div className="text-3xl">{r.emoji}</div>
                    <div className="mt-2 font-semibold text-sm">{r.label}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* KROK 1 — wiek */}
          {step === 1 && (
            <>
              <h1 className="wordmark text-2xl sm:text-3xl text-brand-800">Ile ma lat?</h1>
              <p className="mt-2 text-sm text-brand-600">Wystarczy przedział — nie musisz podawać dokładnego wieku.</p>
              <div className="mt-6 grid gap-3">
                {AGE_RANGES.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => setAgeRange(a.key)}
                    className={`rounded-xl border-2 px-4 py-4 text-left flex items-center gap-4 ${ageRange === a.key ? "border-warm-500 bg-warm-100/40" : "border-brand-200"}`}
                  >
                    <span className="text-3xl">{a.emoji}</span>
                    <span className="font-semibold">{a.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* KROK 2 — potrzeby */}
          {step === 2 && (
            <>
              <h1 className="wordmark text-2xl sm:text-3xl text-brand-800">W czym potrzebna pomoc?</h1>
              <p className="mt-2 text-sm text-brand-600">Zaznacz wszystko, co pasuje.</p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {NEEDS.map((n) => {
                  const on = needs.includes(n.key);
                  return (
                    <button
                      key={n.key}
                      onClick={() => toggleNeed(n.key)}
                      className={`rounded-2xl border-2 p-3 text-left ${on ? "border-warm-500 bg-warm-100/40" : "border-brand-200"}`}
                    >
                      <div className="text-xl">{n.emoji}</div>
                      <div className="mt-1 font-semibold text-sm">{n.label}</div>
                    </button>
                  );
                })}
              </div>
              {needs.includes("Inne") && (
                <div className="mt-4">
                  <label className="text-sm font-semibold">Napisz krótko, co jest potrzebne</label>
                  <textarea
                    value={otherNeed}
                    onChange={(e) => setOtherNeed(e.target.value)}
                    rows={2}
                    placeholder="Np. porządki, wspólne oglądanie meczu..."
                    className="mt-2 w-full rounded-xl border border-brand-200 px-4 py-3"
                  />
                </div>
              )}
            </>
          )}

          {/* KROK 3 — kontakt */}
          {step === 3 && (
            <>
              <h1 className="wordmark text-2xl sm:text-3xl text-brand-800">Zostaw numer telefonu</h1>
              <p className="mt-2 text-brand-700">
                <strong>Oddzwonimy w ciągu 24 godzin</strong> i pomożemy znaleźć osobę,
                która najlepiej dopasuje się do Waszych potrzeb.
              </p>

              {/* Podsumowanie potrzeb */}
              <div className="mt-6 rounded-2xl bg-brand-50 border border-brand-200 p-4 text-sm">
                <div className="font-semibold text-brand-800 mb-2">Szukamy dla Ciebie kogoś kto:</div>
                <div className="flex flex-wrap gap-1.5">
                  {relation && (
                    <span className="text-xs bg-white text-brand-700 px-2 py-1 rounded-full border border-brand-200">
                      {RELATIONS.find((r) => r.key === relation)?.emoji}{" "}
                      {RELATIONS.find((r) => r.key === relation)?.label}
                    </span>
                  )}
                  {ageRange && (
                    <span className="text-xs bg-white text-brand-700 px-2 py-1 rounded-full border border-brand-200">
                      {AGE_RANGES.find((a) => a.key === ageRange)?.label}
                    </span>
                  )}
                  {needs.filter((n) => n !== "Inne").map((k) => {
                    const n = NEEDS.find((x) => x.key === k);
                    return (
                      <span key={k} className="text-xs bg-white text-brand-700 px-2 py-1 rounded-full border border-brand-200">
                        {n?.emoji} {n?.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-semibold">Numer telefonu</label>
                <input
                  required
                  autoFocus
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+48 ..."
                  className="mt-2 w-full rounded-xl border border-brand-200 px-4 py-4 text-lg"
                />
              </div>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              <p className="mt-4 text-xs text-brand-500">
                Nie sprzedajemy Twoich danych. Zadzwonimy tylko w sprawie tego zgłoszenia.
              </p>
            </>
          )}
        </div>

        {/* Nawigacja */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="text-brand-600 hover:text-brand-800 disabled:opacity-40 disabled:cursor-not-allowed font-semibold px-4 py-3"
          >
            ← Wstecz
          </button>
          <button
            onClick={goNext}
            disabled={!canGoNext || sending}
            className="flex-1 sm:flex-none rounded-xl bg-warm-500 hover:bg-warm-600 disabled:opacity-50 text-white font-semibold px-8 py-4 text-lg"
          >
            {step === 3
              ? sending
                ? "Wysyłam..."
                : "Zgłoś się — oddzwonimy w 24h"
              : "Dalej →"}
          </button>
        </div>
      </div>
    </main>
  );
}
