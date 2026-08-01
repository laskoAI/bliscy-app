"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDB } from "@/lib/hooks";
import { currentUser, loadDB, saveDB, uid } from "@/lib/store";
import { Avatar } from "@/components/Avatar";

// ------------------------------
// Konfiguracja onboardingu
// ------------------------------
const AGE_RANGES = [
  { key: "50-60", label: "50–60 lat", emoji: "🌱" },
  { key: "60-70", label: "60–70 lat", emoji: "🌿" },
  { key: "70-80", label: "70–80 lat", emoji: "🍂" },
  { key: "80+",   label: "80+ lat",   emoji: "🌸" },
] as const;

const RELATIONS = [
  { key: "mama",    label: "Mama",    emoji: "👩" },
  { key: "tata",    label: "Tata",    emoji: "👨" },
  { key: "babcia",  label: "Babcia",  emoji: "👵" },
  { key: "dziadek", label: "Dziadek", emoji: "👴" },
  { key: "inny",    label: "Inna osoba", emoji: "🫶" },
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

type Step = 0 | 1 | 2 | 3 | 4;

export default function OnboardingKlient() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();

  useEffect(() => {
    if (!me) router.push("/");
    else if (me.role !== "klient") router.push("/bliski");
  }, [me, router]);

  const [step, setStep] = useState<Step>(0);
  const [relation, setRelation] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [ageRange, setAgeRange] = useState<string>("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [otherNeed, setOtherNeed] = useState("");
  const [seniorId, setSeniorId] = useState<string>("");

  if (!me || me.role !== "klient") return null;

  const total = 4;
  const progress = ((step) / total) * 100;

  function toggleNeed(k: string) {
    setNeeds((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  }

  function finalizeOnboarding() {
    // Zapisz seniora do store
    const d = loadDB();
    const id = uid();
    const relationLabel = RELATIONS.find((r) => r.key === relation)?.label ?? "";
    d.seniors.push({
      id,
      ownerId: me!.id,
      fullName: firstName.trim() || relationLabel || "Bliska osoba",
      city: me!.city,
      birthYear: ageRange ? guessBirthYear(ageRange) : undefined,
      notes: buildNotes(relationLabel, ageRange, needs, otherNeed),
    });
    saveDB(d);
    setSeniorId(id);
    setStep(4);
  }

  // ---------- Rekomendacje (dostępne od kroku 4) ----------
  const recommendations = useMemo(() => {
    if (step !== 4) return [];
    // Dopasowanie: helperzy z miasta klienta, punktowane wg liczby wspólnych usług
    return db.helpers
      .filter((h) => h.verified)
      .filter((h) => !me!.city || h.city.toLowerCase() === me!.city.toLowerCase())
      .map((h) => {
        const matches = h.services.filter((s) => needs.includes(s));
        return { helper: h, matches: matches.length };
      })
      .filter((x) => x.matches > 0)
      .sort((a, b) => b.matches - a.matches)
      .slice(0, 3);
  }, [db, needs, me, step]);

  // ---------- Widok ----------
  return (
    <main className="max-w-2xl mx-auto px-5 py-10">
      <Link href="/klient" className="text-sm text-brand-500 hover:text-brand-800">← Panel</Link>

      {step < 4 && (
        <>
          <div className="mt-2 flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">Znajdźmy odpowiednią osobę</h1>
            <span className="text-sm text-brand-500">Krok {step + 1} z {total}</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-brand-200 overflow-hidden">
            <div className="h-full bg-warm-500 transition-all duration-300" style={{ width: `${progress + 25}%` }} />
          </div>
        </>
      )}

      {/* KROK 1: kim jest ta osoba */}
      {step === 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Kim jest ta osoba dla Ciebie?</h2>
          <p className="mt-1 text-sm text-brand-600">Wybierz najbliższą kategorię - to nam pomoże w komunikacji.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {RELATIONS.map((r) => (
              <button
                key={r.key}
                onClick={() => setRelation(r.key)}
                className={`rounded-2xl border-2 p-4 text-left ${relation === r.key ? "border-warm-500 bg-warm-100/40" : "border-brand-200 bg-white"}`}
              >
                <div className="text-3xl">{r.emoji}</div>
                <div className="mt-2 font-semibold">{r.label}</div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold">Imię (opcjonalnie)</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={relation === "mama" ? "Np. Krystyna" : "Jak się nazywa"}
              className="mt-2 w-full rounded-xl border border-brand-200 bg-white px-4 py-3"
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              disabled={!relation}
              onClick={() => setStep(1)}
              className="rounded-xl bg-warm-500 hover:bg-warm-600 disabled:opacity-50 text-white font-semibold px-6 py-3"
            >
              Dalej →
            </button>
          </div>
        </section>
      )}

      {/* KROK 2: wiek */}
      {step === 1 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Ile ma lat?</h2>
          <p className="mt-1 text-sm text-brand-600">Wybierz przedział - nie musisz podawać dokładnego wieku.</p>
          <div className="mt-6 grid gap-3">
            {AGE_RANGES.map((a) => (
              <button
                key={a.key}
                onClick={() => setAgeRange(a.key)}
                className={`rounded-2xl border-2 p-4 text-left flex items-center gap-4 ${ageRange === a.key ? "border-warm-500 bg-warm-100/40" : "border-brand-200 bg-white"}`}
              >
                <div className="text-3xl">{a.emoji}</div>
                <div className="font-semibold">{a.label}</div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(0)} className="text-brand-500 hover:text-brand-800">← Wstecz</button>
            <button
              disabled={!ageRange}
              onClick={() => setStep(2)}
              className="rounded-xl bg-warm-500 hover:bg-warm-600 disabled:opacity-50 text-white font-semibold px-6 py-3"
            >
              Dalej →
            </button>
          </div>
        </section>
      )}

      {/* KROK 3: potrzeby */}
      {step === 2 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">W czym potrzebna jest pomoc?</h2>
          <p className="mt-1 text-sm text-brand-600">Zaznacz wszystko, co pasuje. Wybierz przynajmniej jedną rzecz.</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {NEEDS.map((n) => {
              const on = needs.includes(n.key);
              return (
                <button
                  key={n.key}
                  onClick={() => toggleNeed(n.key)}
                  className={`rounded-2xl border-2 p-4 text-left ${on ? "border-warm-500 bg-warm-100/40" : "border-brand-200 bg-white"}`}
                >
                  <div className="text-2xl">{n.emoji}</div>
                  <div className="mt-2 font-semibold text-sm">{n.label}</div>
                </button>
              );
            })}
          </div>

          {needs.includes("Inne") && (
            <div className="mt-4">
              <label className="text-sm font-semibold">Napisz krótko, w czym potrzeba pomocy</label>
              <textarea
                value={otherNeed}
                onChange={(e) => setOtherNeed(e.target.value)}
                rows={2}
                placeholder="Np. pomoc przy porządkach, wspólne oglądanie meczu, wyprowadzenie do fryzjera..."
                className="mt-2 w-full rounded-xl border border-brand-200 bg-white px-4 py-3"
              />
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(1)} className="text-brand-500 hover:text-brand-800">← Wstecz</button>
            <button
              disabled={needs.length === 0}
              onClick={() => setStep(3)}
              className="rounded-xl bg-warm-500 hover:bg-warm-600 disabled:opacity-50 text-white font-semibold px-6 py-3"
            >
              Dalej →
            </button>
          </div>
        </section>
      )}

      {/* KROK 4: podsumowanie + zapis */}
      {step === 3 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Sprawdź, czy się zgadza</h2>
          <div className="mt-6 rounded-2xl bg-white border border-brand-200 p-5 space-y-3">
            <Row label="Osoba">
              {RELATIONS.find((r) => r.key === relation)?.label}
              {firstName ? ` · ${firstName}` : ""}
            </Row>
            <Row label="Wiek">{AGE_RANGES.find((a) => a.key === ageRange)?.label}</Row>
            <Row label="Miasto">{me.city}</Row>
            <Row label="Potrzeby">
              <div className="flex flex-wrap gap-1.5 mt-1">
                {needs.map((k) => {
                  const n = NEEDS.find((x) => x.key === k);
                  return (
                    <span key={k} className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">
                      {n?.emoji} {n?.label}
                    </span>
                  );
                })}
              </div>
            </Row>
          </div>

          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(2)} className="text-brand-500 hover:text-brand-800">← Wstecz</button>
            <button
              onClick={finalizeOnboarding}
              className="rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3"
            >
              Zobacz dopasowane osoby →
            </button>
          </div>
        </section>
      )}

      {/* KROK 5: wyniki */}
      {step === 4 && (
        <section className="mt-4">
          <h1 className="text-2xl md:text-3xl font-bold">Znaleźliśmy {recommendations.length} osob{recommendations.length === 1 ? "ę" : "y"} dla Was</h1>
          <p className="mt-2 text-brand-600 text-sm">
            Wybraliśmy Bliskich z Twojego miasta, którzy oferują to, czego potrzebujesz.
          </p>

          {recommendations.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-brand-300 p-8 text-center text-brand-600">
              Nie znaleźliśmy nikogo w {me.city} z tymi usługami.
              <div className="mt-3">
                <Link href="/klient/szukaj" className="text-warm-500 underline font-semibold">
                  Przejrzyj wszystkich Bliskich →
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-4">
            {recommendations.map(({ helper, matches }) => {
              const user = db.users.find((u) => u.id === helper.id);
              if (!user) return null;
              return (
                <Link
                  key={helper.id}
                  href={`/klient/bliski/${helper.id}${seniorId ? `?senior=${seniorId}` : ""}`}
                  className="block bg-white rounded-2xl border border-brand-200 p-5 hover:border-warm-400"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-warm-100 flex items-center justify-center text-2xl shrink-0">
                      {user.fullName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div className="font-semibold">{user.fullName}</div>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                          ✓ {matches} z {needs.length} pasuje
                        </span>
                      </div>
                      <div className="text-sm text-brand-500">{helper.city} · {helper.hourlyRate} zł/h</div>
                      <p className="mt-2 text-sm text-brand-700 line-clamp-2">{helper.bio}</p>
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
                </Link>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-brand-100 p-5 text-sm text-brand-700 text-center">
            Nie widzisz nikogo pasującego?{" "}
            <Link href="/klient/szukaj" className="text-warm-500 underline font-semibold">
              Zobacz wszystkich Bliskich
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-brand-500 font-semibold">{label}</div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

function guessBirthYear(range: string): number {
  const now = new Date().getFullYear();
  if (range === "50-60") return now - 55;
  if (range === "60-70") return now - 65;
  if (range === "70-80") return now - 75;
  if (range === "80+")   return now - 82;
  return now - 70;
}

function buildNotes(relation: string, age: string, needs: string[], otherNeed?: string): string {
  const parts: string[] = [];
  if (relation) parts.push(relation);
  if (age) parts.push(`wiek: ${age}`);
  if (needs.length) parts.push(`potrzeby: ${needs.join(", ")}`);
  if (otherNeed && otherNeed.trim()) parts.push(`inne: ${otherNeed.trim()}`);
  return parts.join(" · ");
}
