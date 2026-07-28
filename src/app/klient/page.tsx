"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDB, fmtDateTime } from "@/lib/hooks";
import { currentUser } from "@/lib/store";

export default function KlientDashboard() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();

  useEffect(() => {
    if (!me) router.push("/");
    else if (me.role !== "klient") router.push("/bliski");
  }, [me, router]);

  if (!me || me.role !== "klient") return null;

  const seniors = db.seniors.filter((s) => s.ownerId === me.id);
  const visits = db.visits
    .filter((v) => v.clientId === me.id)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  const upcoming = visits.filter(
    (v) => v.status !== "completed" && v.status !== "cancelled_by_client" && v.status !== "cancelled_by_helper"
  );

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold">Cześć, {me.fullName.split(" ")[0]} 👋</h1>
      <p className="mt-2 text-brand-600">Panel klienta — zarządzaj seniorami, znajduj Bliskich, rezerwuj wizyty.</p>

      {seniors.length === 0 && (
        <section className="mt-8 rounded-3xl bg-gradient-to-br from-warm-100 to-warm-100/40 border border-warm-400/30 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="text-5xl">✨</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-brand-800">Zacznij od krótkiego kreatora</h2>
              <p className="mt-1 text-sm text-brand-700">
                W 4 krokach powiedz nam o bliskiej osobie i tym, czego potrzebuje —
                pokażemy Ci od razu 3 dopasowanych Bliskich.
              </p>
            </div>
            <Link
              href="/klient/onboarding"
              className="rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3 whitespace-nowrap"
            >
              Zaczynamy →
            </Link>
          </div>
        </section>
      )}

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <Card
          href="/klient/seniorzy"
          icon="👵"
          title="Moi seniorzy"
          desc={`${seniors.length} ${seniors.length === 1 ? "osoba" : "osób"}`}
        />
        <Card
          href="/klient/onboarding"
          icon="🔎"
          title="Znajdź Bliskiego"
          desc="Krótki kreator dopasowania"
        />
        <Card
          href="/klient/wizyty"
          icon="📅"
          title="Wizyty"
          desc={`${upcoming.length} nadchodząca(ych)`}
        />
      </div>

      {upcoming.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold">Nadchodzące wizyty</h2>
          <div className="mt-4 space-y-3">
            {upcoming.slice(0, 5).map((v) => {
              const senior = db.seniors.find((s) => s.id === v.seniorId);
              const helperUser = db.users.find((u) => u.id === v.helperId);
              return (
                <Link
                  key={v.id}
                  href="/klient/wizyty"
                  className="block bg-white rounded-2xl border border-brand-200 p-5 hover:border-warm-400"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <div className="text-sm text-brand-500">{fmtDateTime(v.startsAt)}</div>
                      <div className="mt-1 font-semibold">
                        {senior?.fullName ?? "—"} z {helperUser?.fullName ?? "—"}
                      </div>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

function Card({ href, icon, title, desc }: { href: string; icon: string; title: string; desc: string }) {
  return (
    <Link href={href} className="rounded-2xl bg-white border border-brand-200 p-5 hover:border-warm-400 transition block">
      <div className="text-2xl">{icon}</div>
      <div className="mt-2 font-semibold">{title}</div>
      <div className="text-sm text-brand-600">{desc}</div>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    pending:   { label: "Oczekuje", cls: "bg-warm-100 text-warm-600" },
    confirmed: { label: "Potwierdzona", cls: "bg-emerald-100 text-emerald-700" },
    completed: { label: "Zakończona", cls: "bg-brand-100 text-brand-700" },
    cancelled_by_client: { label: "Anulowana", cls: "bg-red-100 text-red-700" },
    cancelled_by_helper: { label: "Odrzucona", cls: "bg-red-100 text-red-700" },
  };
  const m = map[status] ?? { label: status, cls: "bg-brand-100 text-brand-700" };
  return <span className={`text-xs px-2 py-1 rounded-full font-semibold ${m.cls}`}>{m.label}</span>;
}
