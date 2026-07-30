import Link from "next/link";
import { Avatar } from "@/components/Avatar";

// Publiczny landing — czysta propozycja wartości.
// Kreator jest na osobnej stronie: /znajdz/kreator

export default function ZnajdzLanding() {
  return (
    <main>
      {/* HERO — 2 kolumny: tekst po lewej, zdjęcie po prawej */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-100 to-brand-50" />
        <div className="relative max-w-6xl mx-auto px-5 pt-12 pb-12 md:pt-20 md:pb-20">
          <div className="grid md:grid-cols-[3fr_2fr] gap-10 md:gap-12 items-center">

            {/* Kolumna lewa — treść */}
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-warm-400" /> Startujemy w Warszawie
              </span>

              <h1 className="wordmark mt-5 text-4xl sm:text-5xl md:text-6xl text-brand-800 leading-tight">
                Bliski obok Twoich rodziców,{" "}
                <span className="text-warm-500">gdy Ciebie akurat nie ma</span>.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-brand-700 max-w-xl mx-auto md:mx-0">
                Łączymy seniorów z pełnymi energii, młodymi ludźmi. Pomogą w codziennych sprawach,
                zawiozą do lekarza, wyprowadzą psa — i przyniosą do domu odrobinę słońca.
              </p>

              {/* CTA — 2 przyciski obok siebie */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3">
                <Link
                  href="/znajdz/kreator"
                  className="rounded-full bg-warm-500 hover:bg-warm-600 text-white font-extrabold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition text-center whitespace-nowrap"
                >
                  Wypróbuj za darmo →
                </Link>
                <a
                  href="#jak"
                  className="rounded-full border-2 border-brand-300 hover:border-brand-500 text-brand-800 font-semibold px-8 py-4 text-lg text-center whitespace-nowrap"
                >
                  Jak to działa?
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-sm text-brand-500">
                <span>Bez rejestracji</span>
                <span>·</span>
                <span>3 kroki</span>
                <span>·</span>
                <span>2 minuty</span>
              </div>

              <p className="mt-4 text-sm text-brand-600 text-center md:text-left">
                📍 Działamy w <strong>Warszawie i okolicach</strong>.
              </p>
            </div>

            {/* Kolumna prawa — zdjęcie babci */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-brand-200 aspect-[4/3] bg-brand-100">
                <img
                  src="/bliscy-main.jpg"
                  alt="Uśmiechnięta starsza pani ze swoim Bliskim"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-900/25 to-transparent" />
              </div>
              {/* Mała plakietka — ciepły akcent */}
              <div className="hidden md:flex absolute -bottom-4 -left-4 items-center gap-3 rounded-2xl bg-white border border-brand-200 shadow-lg px-4 py-3">
                <span className="text-2xl">💛</span>
                <div>
                  <div className="text-xs text-brand-500">Pani Krystyna, 78 lat</div>
                  <div className="text-sm font-semibold text-brand-800">Ma teraz swojego Bliskiego</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROPOZYCJA WARTOŚCI — 3 filary */}
      <section className="py-10 sm:py-12 md:py-14">
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
      <section id="kim" className="py-12 sm:py-16 bg-brand-100 scroll-mt-20">
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
              <img
                src="/bliscy-ania.jpg"
                alt="Ania"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover object-center shrink-0"
                loading="lazy"
              />
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
      <section id="opinie" className="py-12 sm:py-16 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
              Co mówią rodziny
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold">
              Ludzie, którym pomogliśmy
            </h2>
            <p className="mt-3 text-brand-700">
              Wystarczy jedno popołudnie w tygodniu — i mama ma towarzystwo,
              a Ty spokój, że ktoś tam był.
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

      {/* KONTROLA I RAPORTY — masz wgląd w każdą wizytę */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
              W aplikacji
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-800">
              Zawsze wiesz, co się dzieje u mamy.
            </h2>
            <p className="mt-4 text-brand-700 text-base sm:text-lg">
              Nie musisz co chwilę dzwonić i pytać. Po każdej wizycie widzisz w aplikacji,
              co się działo — konkretnie, punkt po punkcie.
            </p>
            <ul className="mt-6 space-y-3 text-brand-800">
              <li className="flex items-start gap-3">
                <span className="text-xl">✅</span>
                <span><strong>Konkretne czynności</strong> — leki wzięte, ciśnienie zmierzone, śniadanie zjedzone.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">📝</span>
                <span><strong>Krótki raport</strong> po każdej wizycie — co warto wiedzieć na następny raz.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💬</span>
                <span><strong>Możesz dopytać</strong> Bliskiego przez czat.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">⭐</span>
                <span><strong>Ocena wizyty przez seniora</strong> — zobaczysz, czy mama dobrze się czuła w towarzystwie.</span>
              </li>
            </ul>
          </div>

          {/* Mockup dashboardu wizyty */}
          <div className="rounded-3xl bg-white border border-brand-200 p-5 md:p-6 shadow-sm">
            {/* Header wizyty */}
            <div className="flex items-center justify-between text-xs text-brand-500">
              <span>Wtorek, 12 listopada · 14:00 — 16:00</span>
              <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-1 font-semibold">✓ Zakończona</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Avatar seed="Kasia Wiśniewska" size={44} alt="Kasia" />
              <div className="min-w-0">
                <div className="font-semibold text-sm">Kasia u Pani Krystyny</div>
                <div className="text-xs text-brand-500 truncate">Studentka fizjoterapii · Warszawa</div>
              </div>
            </div>

            {/* Checklist wykonanych czynności */}
            <div className="mt-5 rounded-2xl bg-brand-50 border border-brand-200 p-4">
              <div className="text-xs font-semibold text-brand-700 uppercase tracking-wider">Wykonane podczas wizyty</div>
              <ul className="mt-3 space-y-2 text-sm">
                <ChecklistItem done label="Śniadanie zjedzone" detail="owsianka + herbata" />
                <ChecklistItem done label="Leki poranne wzięte" detail="ramipril, metformin" />
                <ChecklistItem done label="Ciśnienie zmierzone" detail={<><strong>128/82</strong> · puls 72</>} />
                <ChecklistItem done label="Spacer" detail="45 min, park Skaryszewski" />
                <ChecklistItem pending label="Wieczorne leki" detail="do wzięcia o 20:00" />
              </ul>
            </div>

            {/* Krótka notatka */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-brand-500 uppercase tracking-wider">Notatka od Kasi</div>
              <p className="mt-1.5 text-sm text-brand-700">
                Pani Krystyna w dobrym humorze, apetyt dopisał. Podczas spaceru mówiła
                trochę o bólu prawego kolana — może warto wspomnieć lekarzowi na wizycie w piątek.
              </p>
            </div>

            {/* Ocena + akcja */}
            <div className="mt-5 pt-4 border-t border-brand-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-brand-500">Ocena od Pani Krystyny</div>
                <div className="text-warm-500 text-lg leading-none">★★★★★</div>
              </div>
              <button className="text-xs text-warm-500 hover:text-warm-600 font-semibold">
                Napisz do Kasi →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CO ROBIĄ BLISCY */}
      <section className="py-12 sm:py-16 bg-brand-100">
        <div className="max-w-5xl mx-auto px-5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Z czym pomagają Bliscy</h2>
            <p className="mt-3 text-brand-700">
              To nie opieka medyczna. To zwykłe, ludzkie rzeczy, które robią różnicę —
              wspólne wyjście, załatwiona sprawa, ktoś do rozmowy przy herbacie.
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
      <section id="jak" className="py-12 sm:py-16 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-warm-100 text-warm-500 text-xs font-semibold px-3 py-1">
              Krok po kroku
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-800">
              4 proste kroki do codziennego spokoju o bliskich
            </h2>
            <p className="mt-3 text-brand-700">
              Bez zakładania konta, bez formalności na start. Ma być prosto — dla Ciebie
              i dla Twojej mamy.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5 md:gap-6">
            <FlowStep
              n={1}
              emoji="📝"
              title="Powiedz, kogo szukacie"
              desc="Kilka klików: dla kogo, w jakim wieku, w czym pomóc. 2 minuty, bez rejestracji."
            />
            <FlowStep
              n={2}
              emoji="📞"
              title="Dzwonimy w 24h"
              desc="Krótka rozmowa — poznajemy Was i Wasze potrzeby, zanim kogokolwiek zaproponujemy."
            />
            <FlowStep
              n={3}
              emoji="🤝"
              title="Poznajecie Bliskiego"
              desc="Proponujemy 1–2 dopasowane osoby. Pierwsze spotkanie u Was w domu — sprawdzacie chemię."
            />
            <FlowStep
              n={4}
              emoji="💛"
              title="Zaczynacie się widywać"
              desc="Ustalacie rytm razem. Po każdej wizycie masz w aplikacji raport — co robili, jak było."
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/znajdz/kreator"
              className="inline-flex items-center rounded-full bg-warm-500 hover:bg-warm-600 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition"
            >
              Zaczynamy od kroku 1 →
            </Link>
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

function FlowStep({ n, emoji, title, desc }: { n: number; emoji: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-brand-200 bg-white p-6 flex gap-4">
      <div className="shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-warm-500 text-white flex items-center justify-center font-bold text-sm">
          {n}
        </div>
        <div className="mt-3 text-3xl">{emoji}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg text-brand-800">{title}</h3>
        <p className="mt-2 text-brand-700 text-sm sm:text-base leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ stars, quote, author, context }: { stars: number; quote: string; author: string; context: string }) {  return (
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

function ChecklistItem({ done, pending, label, detail }: {
  done?: boolean;
  pending?: boolean;
  label: string;
  detail?: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border ${
          done
            ? "bg-emerald-500 border-emerald-500 text-white"
            : pending
            ? "bg-white border-warm-400 text-warm-500"
            : "bg-white border-brand-300 text-brand-400"
        }`}
        aria-hidden
      >
        {done ? "✓" : pending ? "◷" : ""}
      </span>
      <div className="min-w-0 flex-1">
        <div className={done ? "text-brand-800" : "text-brand-700"}>
          {label}
          {pending && <span className="ml-2 text-xs text-warm-500 font-semibold">jeszcze do wzięcia</span>}
        </div>
        {detail && <div className="text-xs text-brand-500 mt-0.5">{detail}</div>}
      </div>
    </li>
  );
}
