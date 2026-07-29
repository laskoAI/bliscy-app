import Link from "next/link";

// Publiczny landing — czysta propozycja wartości.
// Kreator jest na osobnej stronie: /znajdz/kreator

export default function ZnajdzLanding() {
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
            <Link
              href="/znajdz/kreator"
              className="w-full sm:w-auto rounded-full bg-warm-500 hover:bg-warm-600 text-white font-extrabold px-12 py-6 text-2xl sm:text-3xl shadow-lg hover:shadow-xl transition"
            >
              Zaczynamy →
            </Link>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-sm text-brand-500">
              <span>Bez rejestracji</span>
              <span className="hidden sm:inline">·</span>
              <span>3 kroki</span>
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
              emoji="🎓"
              title="Młodzi ludzie z sercem"
              desc="Najczęściej studenci psychologii, fizjoterapii i medycyny — osoby, dla których praca z ludźmi to powołanie, nie przypadek."
            />
          </div>
        </div>
      </section>

      {/* KIM SĄ BLISCY — akcent na młodych studentów */}
      <section className="py-12 sm:py-16 bg-brand-100">
        <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
              Kim są Bliscy
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-800">
              Młodzi, empatyczni, sprawdzeni.
            </h2>
            <p className="mt-4 text-brand-700 text-base sm:text-lg">
              Naszymi Bliskimi są przede wszystkim <strong>studenci psychologii, fizjoterapii i medycyny</strong>.
              Ludzie, dla których praca z drugim człowiekiem to nie fucha, tylko powołanie.
            </p>
            <ul className="mt-6 space-y-3 text-brand-800">
              <li className="flex items-start gap-3">
                <span className="text-xl">🎓</span>
                <span><strong>Studenci</strong> psychologii, fizjoterapii, pielęgniarstwa, medycyny.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🛡️</span>
                <span><strong>Weryfikacja</strong> tożsamości, rozmowa rekrutacyjna, referencje.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💛</span>
                <span><strong>Empatia i cierpliwość</strong> — nie każdy do nas trafia. Wybieramy tych, których sami zaprosilibyśmy do naszej babci.</span>
              </li>
            </ul>
          </div>

          {/* Przykładowy profil Bliskiego */}
          <div className="rounded-3xl bg-white border border-brand-200 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center text-3xl shrink-0">
                👩‍🎓
              </div>
              <div>
                <div className="font-bold text-lg">Ania, 23 lata</div>
                <div className="text-sm text-brand-500">Studentka psychologii · Warszawa</div>
              </div>
              <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                ✓ Zweryfikowana
              </span>
            </div>
            <blockquote className="mt-5 text-brand-700 italic border-l-4 border-warm-400 pl-4">
              „Moja babcia mieszka sama i wiem, jak bardzo cieszy ją zwykła rozmowa.
              Chcę być dla kogoś taką osobą — poczytać, pójść na spacer, po prostu być."
            </blockquote>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["☕ Rozmowa", "🚶 Spacer", "🛒 Zakupy", "🏥 Lekarz"].map((s) => (
                <span key={s} className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — opinie rodzin */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
              Co mówią rodziny
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold">
              Ludzie, którym pomogliśmy
            </h2>
            <p className="mt-3 text-brand-700">
              To nie są wielkie zmiany. To jedno popołudnie w tygodniu, w którym mama nie jest sama.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <TestimonialCard
              stars={5}
              quote="Kasia przychodzi do mamy dwa razy w tygodniu na spacer. Mama ożywa, jak ją widzi. Dla mnie jak kamień z serca — mieszkam 400 km stąd."
              author="Magdalena, córka"
              context="Mama, 78 lat · Warszawa"
            />
            <TestimonialCard
              stars={5}
              quote="Byliśmy sceptyczni — obca osoba u taty? Ale Piotr od pierwszej wizyty złapał z nim wspólny język. Grają w szachy, chodzą na kawę. Tata się śmieje jak dawno nie."
              author="Robert, syn"
              context="Tata, 82 lata · Warszawa"
            />
            <TestimonialCard
              stars={5}
              quote="Studentka fizjoterapii pomaga babci przy ćwiczeniach i zabiera ją do lekarza. Serdeczna, punktualna, cierpliwa. Polecam z całego serca."
              author="Ewa, wnuczka"
              context="Babcia, 84 lata · Warszawa"
            />
          </div>

          {/* Pasek statystyk */}
          <div className="mt-12 rounded-3xl bg-brand-800 text-white p-6 md:p-8 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-warm-400">120+</div>
              <div className="mt-1 text-sm text-brand-100">rodzin czeka na start</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-warm-400">100%</div>
              <div className="mt-1 text-sm text-brand-100">Bliskich zweryfikowanych</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-warm-400">24h</div>
              <div className="mt-1 text-sm text-brand-100">tyle trwa nasza odpowiedź</div>
            </div>
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
            <Link
              href="/znajdz/kreator"
              className="rounded-full bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3 whitespace-nowrap"
            >
              Sprawdź kto pomoże →
            </Link>
          </div>
        </div>
      </section>

      {/* JAK TO DZIAŁA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">Jak to działa</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <StepCard n={1} title="Powiedz nam czego potrzebujesz" desc="3 krótkie pytania: dla kogo, w jakim mieście, w czym pomóc. Bez rejestracji." />
            <StepCard n={2} title="Zostawiasz numer" desc="Kończysz kreator zostawiając telefon. Bez zobowiązań, bez opłat na start." />
            <StepCard n={3} title="Oddzwaniamy w 24h" desc="Rozmawiamy z Tobą i dopasowujemy Bliskiego, który najlepiej pasuje do Waszej sytuacji." />
          </div>
        </div>
      </section>

      {/* CTA końcowe */}
      <section className="py-14 sm:py-20 bg-brand-800 text-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Ty nie musisz być wszędzie na raz.</h2>
          <p className="mt-4 text-brand-100 max-w-xl mx-auto">
            Sprawdź, czy w mieście Twoich rodziców jest ktoś, kto może zajrzeć.
            To nic nie kosztuje — dopóki nie umówisz spotkania.
          </p>
          <Link
            href="/znajdz/kreator"
            className="mt-8 inline-flex items-center rounded-full bg-warm-500 hover:bg-warm-600 text-white font-semibold px-8 py-4 text-lg"
          >
            Zaczynamy →
          </Link>
        </div>
      </section>

      <footer className="py-8 border-t border-brand-200 text-center text-xs text-brand-500">
        © {new Date().getFullYear()} <span className="wordmark">bliscy</span> · Warszawa
      </footer>
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

function StepCard({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-brand-200 p-6 bg-white">
      <div className="w-10 h-10 rounded-full bg-warm-500 text-white flex items-center justify-center font-bold">{n}</div>
      <h3 className="mt-4 font-bold text-lg">{title}</h3>
      <p className="mt-2 text-brand-700 text-sm">{desc}</p>
    </div>
  );
}

function TestimonialCard({ stars, quote, author, context }: { stars: number; quote: string; author: string; context: string }) {
  return (
    <div className="rounded-3xl border border-brand-200 bg-white p-6 flex flex-col">
      <div className="flex text-warm-500 text-lg">
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <blockquote className="mt-3 text-brand-800 text-sm md:text-base flex-1">
        „{quote}"
      </blockquote>
      <div className="mt-4 pt-4 border-t border-brand-100">
        <div className="font-semibold text-brand-800">{author}</div>
        <div className="text-xs text-brand-500">{context}</div>
      </div>
    </div>
  );
}
