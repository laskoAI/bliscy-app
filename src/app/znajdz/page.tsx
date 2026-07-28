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

type Match = { helper: Helper; user: User; matches: number };

export default function ZnajdzLanding() {
  // Czy kreator jest już otwarty (po kliknięciu "Zaczynamy")
  const [wizardOpen, setWizardOpen] = useState(false);

  // Wybory kreatora
  const [relation, setRelation] = useState<string>("");
  const [city] = useState<string>("Warszawa"); // na razie tylko Warszawa
  const [ageRange, setAgeRange] = useState<string>("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [otherNeed, setOtherNeed] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  // Kontakt na końcu
  const [contactOpen, setContactOpen] = useState(false);
  const [contactHelperId, setContactHelperId] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [contactSent, setContactSent] = useState(false);

  const [db, setDb] = useState(() => (typeof window !== "undefined" ? loadDB() : null));
  useEffect(() => { if (!db) setDb(loadDB()); }, [db]);

  // Kliknięcie "Zaczynamy" w globalnej nawigacji
  useEffect(() => {
    const h = () => startWizard();
    window.addEventListener("znajdz-start", h);
    return () => window.removeEventListener("znajdz-start", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const canSeeResults = needs.length > 0;

  function toggleNeed(k: string) {
    setNeeds((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  }

  function startWizard() {
    setWizardOpen(true);
    setTimeout(() => {
      document.getElementById("kreator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
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
    console.log("Zgłoszenie zapotrzebowania:", {
      helperId: contactHelperId,
      relation, city, ageRange, needs, otherNeed,
      contact,
    });
    setContactSent(true);
  }

  return (
    <main>
      {/* HERO — czysta propozycja wartości */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-100 to-brand-50" />
        <div className="relative max-w-5xl mx-auto px-5 pt-16 pb-16 md:pt-24 md:pb-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-warm-400" /> Startujemy w Warszawie
          </span>

          <h1 className="wordmark mt-6 text-4xl sm:text-5xl md:text-6xl text-brand-800 leading-tight">
            Ktoś obok Twoich rodziców, <br className="hidden md:inline" />
            <span className="text-warm-500">gdy Ciebie akurat nie ma</span>.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-brand-700 max-w-2xl mx-auto">
            Łączymy seniorów z serdecznymi, sprawdzonymi osobami — Bliskimi.
            Wyprowadzają psa, jeżdżą do lekarza, robią zakupy, słuchają, są.
            Bez opieki medycznej. Po prostu drugi człowiek obok.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={startWizard}
              className="w-full sm:w-auto rounded-full bg-warm-500 hover:bg-warm-600 text-white font-extrabold px-12 py-6 text-2xl sm:text-3xl shadow-lg hover:shadow-xl transition"
            >
              Zaczynamy →
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-sm text-brand-500">
              <span>Bez rejestracji</span>
              <span className="hidden sm:inline">·</span>
              <span>3 pytania</span>
              <span className="hidden sm:inline">·</span>
              <span>2 minuty</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROPOZYCJA WARTOŚCI — 3 filary */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard
              emoji="🛡️"
              title="Zweryfikowane osoby"
              desc="Każdy Bliski przechodzi rozmowę i weryfikację. Nie wpuszczasz do domu przypadkowej osoby."
            />
            <ValueCard
              emoji="⏱️"
              title="Bez formalności na start"
              desc="Nie zakładasz konta, nie wpisujesz PESEL-u. Zostawiasz namiary, gdy znajdziesz kogoś dla Was."
            />
            <ValueCard
              emoji="💛"
              title="Osoby z Twojej okolicy"
              desc="Bliski to nie firma — to sąsiad, student, emerytka. Ktoś, kto może zajrzeć regularnie."
            />
          </div>
        </div>
      </section>

      {/* CO ROBIĄ BLISCY */}
      <section className="py-12 sm:py-16 bg-brand-100">
        <div className="max-w-5xl mx-auto px-5">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Z czym pomagają Bliscy</h2>
            <p className="mt-3 text-brand-700">
              To nie opieka medyczna ani pielęgniarska. To codzienna obecność — spacer,
              rozmowa, wizyta u lekarza, sprawy w urzędzie.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              ["☕", "Towarzystwo"],
              ["🚶", "Spacery"],
              ["🛒", "Zakupy i apteka"],
              ["🏥", "Wizyta u lekarza"],
              ["📋", "Sprawy urzędowe"],
              ["✍️", "Coś innego"],
            ].map(([e, t]) => (
              <div key={t} className="rounded-2xl bg-white border border-brand-200 p-5 flex items-center gap-3">
                <span className="text-2xl">{e}</span>
                <span className="font-semibold">{t}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-white border border-warm-200 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="text-5xl">🤝</div>
            <div className="flex-1">
              <div className="text-xl md:text-2xl font-extrabold text-brand-800">
                Pomożemy Ci znaleźć osobę, która zajmie się Twoim seniorem
              </div>
              <p className="mt-2 text-brand-700">
                Powiedz nam, czego potrzebujesz — połączymy Cię z Bliskim, który najlepiej
                dopasuje się do Waszej sytuacji.
              </p>
            </div>
            <button
              onClick={startWizard}
              className="rounded-full bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3 whitespace-nowrap"
            >
              Sprawdź kto pomoże →
            </button>
          </div>
        </div>
      </section>

      {/* JAK TO DZIAŁA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">Jak to działa</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <StepCard n={1} title="Powiedz nam czego potrzebujesz" desc="3 krótkie pytania: dla kogo, w jakim mieście, w czym pomóc. Bez rejestracji." />
            <StepCard n={2} title="Zobacz dopasowane osoby" desc="Pokazujemy zweryfikowanych Bliskich, którzy oferują to, o co pytasz." />
            <StepCard n={3} title="Umów pierwsze spotkanie" desc="Zostawiasz namiary, my kontaktujemy Was. Pierwsza rozmowa bez zobowiązań." />
          </div>
        </div>
      </section>

      {/* KREATOR — pokazuje się dopiero po kliknięciu "Zaczynamy" */}
      {wizardOpen && (
        <section id="kreator" className="py-12 sm:py-16 bg-brand-100">
          <div className="max-w-3xl mx-auto px-5">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
                3 krótkie pytania
              </span>
              <h2 className="wordmark mt-3 text-3xl sm:text-4xl text-brand-800">Znajdźmy odpowiednią osobę</h2>
            </div>

            <div className="mt-8 rounded-3xl bg-white border border-brand-200 p-6 md:p-8 shadow-sm">
              {/* Krok 1 */}
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

              {/* Krok 2 — wiek (miasto na razie ustawione na Warszawę automatycznie) */}
              <div className="mt-8">
                <StepHeader n={2} title="Wiek seniora" small />
                <div className="mt-3 grid sm:grid-cols-3 gap-2">
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
                <p className="mt-2 text-xs text-brand-500">
                  Miasto: Warszawa <span className="text-brand-400">· na razie działamy tylko tutaj</span>
                </p>
              </div>

              {/* Krok 3 — potrzeby */}
              <div className="mt-8">
                <StepHeader n={3} title="W czym potrzebna jest pomoc?" small />
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
                    Zaznacz przynajmniej jedną potrzebę.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WYNIKI */}
      {wizardOpen && showResults && canSeeResults && (
        <section id="wyniki" className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-5">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1">
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

            <div className="mt-10 rounded-2xl bg-brand-100 border border-brand-200 p-5 text-sm text-brand-700 text-center">
              Chcesz zarządzać wizytami z jednego panelu?{" "}
              <Link href="/" className="text-warm-500 underline font-semibold">
                Załóż konto
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA końcowe (tylko gdy kreator jeszcze nie otwarty) */}
      {!wizardOpen && (
        <section className="py-14 sm:py-20 bg-brand-800 text-white">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Ty nie musisz być wszędzie na raz.</h2>
            <p className="mt-4 text-brand-100 max-w-xl mx-auto">
              Sprawdź, czy w mieście Twoich rodziców jest ktoś, kto może zajrzeć.
              To nic nie kosztuje — dopóki nie umówisz spotkania.
            </p>
            <button
              onClick={startWizard}
              className="mt-8 inline-flex items-center rounded-full bg-warm-500 hover:bg-warm-600 text-white font-semibold px-8 py-4 text-lg"
            >
              Zaczynamy →
            </button>
          </div>
        </section>
      )}

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
function ValueCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-brand-200 bg-white p-6">
      <div className="text-3xl">{emoji}</div>
      <h3 className="mt-3 font-bold text-lg text-brand-800">{title}</h3>
      <p className="mt-2 text-sm text-brand-700">{desc}</p>
    </div>
  );
}

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
