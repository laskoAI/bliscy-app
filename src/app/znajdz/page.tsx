"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadDB, type Helper, type User } from "@/lib/store";

// ------------------------------
// Konfiguracja kreatora (public)
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

const CITIES = ["Warszawa", "Kraków"];

type Match = { helper: Helper; user: User; matches: number };

export default function ZnajdzLanding() {
  // Wybory kreatora
  const [relation, setRelation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [ageRange, setAgeRange] = useState<string>("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [otherNeed, setOtherNeed] = useState<string>("");

  // Sygnalizacja "wypełnij wszystko" żeby zjechać do wyników
  const [showResults, setShowResults] = useState(false);

  // Kontakt na końcu
  const [contactOpen, setContactOpen] = useState(false);
  const [contactHelperId, setContactHelperId] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [contactSent, setContactSent] = useState(false);

  // Zbierz helperów raz z seedowanego store (bez subskrybowania — landing publiczny)
  const [db, setDb] = useState(() => (typeof window !== "undefined" ? loadDB() : null));
  useEffect(() => {
    if (!db) setDb(loadDB());
  }, [db]);

  const matches: Match[] = useMemo(() => {
    if (!db) return [];
    return db.helpers
      .filter((h) => h.verified)
      .filter((h) => (city ? h.city.toLowerCase() === city.toLowerCase() : true))
      .map((h) => {
        const overlap = h.services.filter((s) => needs.includes(s)).length;
        return { helper: h, user: db.users.find((u) => u.id === h.id)!, matches: overlap };
      })
      .filter((x) => x.user)
      .sort((a, b) => b.matches - a.matches)
      .slice(0, 6);
  }, [db, city, needs]);

  const canSeeResults = city && needs.length > 0;

  function toggleNeed(k: string) {
    setNeeds((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  }

  function scrollToResults() {
    setShowResults(true);
    setTimeout(() => {
      document.getElementById("wyniki")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function openContact(helperId: string) {
    setContactHelperId(helperId);
    setContactOpen(true);
    setContactSent(false);
  }

  function sendContact(e: React.FormEvent) {
    e.preventDefault();
    // W tej wersji tylko demo — normalnie wysłalibyśmy do Supabase lub e-mailem.
    console.log("Zgłoszenie zapotrzebowania:", {
      helperId: contactHelperId,
      relation, city, ageRange, needs, otherNeed,
      contact,
    });
    setContactSent(true);
  }

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-100 to-brand-50" />
        <div className="relative max-w-4xl mx-auto px-5 pt-14 pb-10 md:pt-20 md:pb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-warm-400" /> Bez rejestracji, bez logowania
          </span>
          <h1 className="wordmark mt-5 text-4xl sm:text-5xl md:text-6xl text-brand-800 leading-tight">
            Znajdź Bliskiego <br className="hidden sm:inline" /> dla mamy, taty albo dziadka
          </h1>
          <p className="mt-5 text-base sm:text-lg text-brand-700 max-w-xl mx-auto">
            W 3 pytaniach pokażemy zaufane osoby z Twojego miasta, które mogą pomóc.
            Spacer, apteka, wizyta u lekarza, wyprowadzenie psa albo po prostu rozmowa przy kawie.
          </p>
          <a
            href="#kreator"
            className="mt-8 inline-flex items-center rounded-full bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3"
          >
            Zaczynamy →
          </a>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-brand-600">
            <div className="flex items-center gap-2"><span className="text-lg">🛡️</span> Weryfikacja Bliskich</div>
            <div className="flex items-center gap-2"><span className="text-lg">💛</span> Bez zobowiązań</div>
            <div className="flex items-center gap-2"><span className="text-lg">🇵🇱</span> Robione w Polsce</div>
          </div>
        </div>
      </section>

      {/* KREATOR */}
      <section id="kreator" className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-5">
          {/* Krok 1 — dla kogo */}
          <div className="rounded-3xl bg-white border border-brand-200 p-6 md:p-8 shadow-sm">
            <StepHeader n={1} title="Dla kogo szukasz Bliskiego?" />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
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

            {/* Krok 2 — miasto + wiek */}
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div>
                <StepHeader n={2} title="Miasto" small />
                <div className="mt-3 grid gap-2">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`rounded-xl border-2 px-4 py-3 text-left ${city === c ? "border-warm-500 bg-warm-100/40" : "border-brand-200"}`}
                    >
                      <span className="font-semibold">{c}</span>
                    </button>
                  ))}
                  <input
                    type="text"
                    value={CITIES.includes(city) ? "" : city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Inne miasto..."
                    className="rounded-xl border border-brand-200 px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <StepHeader n={3} title="Wiek" small />
                <div className="mt-3 grid gap-2">
                  {AGE_RANGES.map((a) => (
                    <button
                      key={a.key}
                      onClick={() => setAgeRange(a.key)}
                      className={`rounded-xl border-2 px-4 py-3 text-left flex items-center gap-3 ${ageRange === a.key ? "border-warm-500 bg-warm-100/40" : "border-brand-200"}`}
                    >
                      <span className="text-xl">{a.emoji}</span>
                      <span className="font-semibold">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Krok 3 — potrzeby */}
            <div className="mt-8">
              <StepHeader n={4} title="W czym potrzebna jest pomoc?" small />
              <p className="mt-1 text-sm text-brand-600">Zaznacz wszystko, co pasuje.</p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                    placeholder="Np. pomoc przy porządkach, wspólne oglądanie meczu..."
                    className="mt-2 w-full rounded-xl border border-brand-200 px-4 py-3"
                  />
                </div>
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={scrollToResults}
                disabled={!canSeeResults}
                className="w-full rounded-xl bg-warm-500 hover:bg-warm-600 disabled:opacity-50 text-white font-semibold px-6 py-3 text-lg"
              >
                Pokaż dopasowane osoby →
              </button>
              {!canSeeResults && (
                <p className="mt-2 text-xs text-brand-500 text-center">
                  Wybierz miasto i przynajmniej jedną potrzebę.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WYNIKI */}
      {showResults && canSeeResults && (
        <section id="wyniki" className="py-12 sm:py-16 bg-brand-100">
          <div className="max-w-4xl mx-auto px-5">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
                Twoje dopasowania
              </span>
              <h2 className="wordmark mt-3 text-3xl sm:text-4xl text-brand-800">
                {matches.length === 0
                  ? "Nie znaleźliśmy jeszcze nikogo"
                  : `Znaleźliśmy ${matches.length} osob${matches.length === 1 ? "ę" : "y"}`}
              </h2>
              <p className="mt-2 text-brand-700 text-sm">
                {matches.length === 0
                  ? "Zostaw namiary — odezwiemy się, gdy będzie ktoś w Twojej okolicy."
                  : `Bliscy w ${city}, którzy oferują to, czego potrzebujesz.`}
              </p>
            </div>

            {matches.length === 0 ? (
              <div className="mt-8 max-w-md mx-auto rounded-2xl bg-white border border-brand-200 p-6 text-center">
                <button
                  onClick={() => openContact("no-match")}
                  className="rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3"
                >
                  Zgłoś zapotrzebowanie
                </button>
              </div>
            ) : (
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {matches.map(({ helper, user, matches: m }) => (
                  <article
                    key={helper.id}
                    className="bg-white rounded-2xl border border-brand-200 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-warm-100 flex items-center justify-center text-2xl shrink-0">
                        {user.fullName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <div className="font-semibold">{user.fullName}</div>
                          {m > 0 && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                              ✓ {m} z {needs.filter((n) => n !== "Inne").length} pasuje
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-brand-500">
                          {helper.city} · {helper.hourlyRate} zł/h
                          {helper.transport && <span> · 🚗 auto</span>}
                        </div>
                        <p className="mt-2 text-sm text-brand-700 line-clamp-3">{helper.bio}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {helper.services.map((s) => {
                            const highlighted = needs.includes(s);
                            return (
                              <span
                                key={s}
                                className={`text-xs px-2 py-0.5 rounded-full ${highlighted ? "bg-warm-100 text-warm-600 font-semibold" : "bg-brand-100 text-brand-700"}`}
                              >
                                {s}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openContact(helper.id)}
                      className="mt-4 w-full rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-4 py-2.5"
                    >
                      Umów spotkanie
                    </button>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-10 rounded-2xl bg-white border border-brand-200 p-5 text-sm text-brand-700 text-center">
              Chcesz zobaczyć więcej opcji albo zarządzać wizytami z jednego panelu?{" "}
              <Link href="/" className="text-warm-500 underline font-semibold">
                Załóż konto
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* JAK TO DZIAŁA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">Jak to działa</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <StepCard n={1} title="Powiedz nam czego potrzebujesz" desc="3 krótkie pytania: dla kogo, w jakim mieście, w czym pomóc." />
            <StepCard n={2} title="Zobacz dopasowane osoby" desc="Pokazujemy zweryfikowanych Bliskich z Twojej okolicy, którzy oferują to, o co pytasz." />
            <StepCard n={3} title="Umów pierwsze spotkanie" desc="Zostawiasz namiary, my kontaktujemy Ciebie i Bliskiego. Pierwsza rozmowa bez zobowiązań." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-brand-800 text-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Jesteś na chwilę bliżej.</h2>
          <p className="mt-3 text-brand-100 max-w-xl mx-auto">
            Nie musisz się rejestrować, żeby zobaczyć czy w Twoim mieście jest dla Was ktoś odpowiedni.
          </p>
          <a
            href="#kreator"
            className="mt-6 inline-flex items-center rounded-full bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3"
          >
            Zacznij od pytań
          </a>
        </div>
      </section>

      <footer className="py-8 border-t border-brand-200 text-center text-xs text-brand-500">
        © {new Date().getFullYear()} <span className="wordmark">bliscy</span> · demo publiczne
      </footer>

      {/* Modal kontaktowy */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 bg-brand-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            {contactSent ? (
              <div className="text-center">
                <div className="text-4xl">💛</div>
                <h3 className="mt-3 text-xl font-bold">Dziękujemy!</h3>
                <p className="mt-2 text-sm text-brand-600">
                  Odezwiemy się w ciągu 24h i pomożemy umówić pierwsze spotkanie.
                </p>
                <button
                  onClick={() => setContactOpen(false)}
                  className="mt-6 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-semibold px-6 py-2.5"
                >
                  Zamknij
                </button>
              </div>
            ) : (
              <form onSubmit={sendContact} className="space-y-3">
                <h3 className="text-xl font-bold">Umów pierwsze spotkanie</h3>
                <p className="text-sm text-brand-600">
                  Zostaw namiary, zadzwonimy albo napiszemy w ciągu 24h.
                </p>
                <input
                  required
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder="Imię i nazwisko"
                  className="w-full rounded-xl border border-brand-200 px-4 py-3"
                />
                <input
                  required
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="E-mail"
                  className="w-full rounded-xl border border-brand-200 px-4 py-3"
                />
                <input
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="Telefon (opcjonalnie)"
                  className="w-full rounded-xl border border-brand-200 px-4 py-3"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactOpen(false)}
                    className="rounded-xl border border-brand-200 hover:bg-brand-100 font-semibold px-4 py-2.5"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-2.5"
                  >
                    Wyślij zgłoszenie
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

// ------------------------------
// Presentational helpers
// ------------------------------
function StepHeader({ n, title, small }: { n: number; title: string; small?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`inline-flex items-center justify-center rounded-full bg-warm-500 text-white font-bold ${small ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm"}`}>
        {n}
      </span>
      <h2 className={small ? "font-bold text-lg" : "font-bold text-xl"}>{title}</h2>
    </div>
  );
}

function StepCard({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-brand-200 p-6 bg-white">
      <div className="w-10 h-10 rounded-full bg-warm-500 text-white flex items-center justify-center font-bold">{n}</div>
      <h3 className="mt-4 font-bold text-lg">{title}</h3>
      <p className="mt-2 text-brand-700 text-sm">{desc}</p>
    </div>
  );
}
