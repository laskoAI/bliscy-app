"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDB, fmtDateTime } from "@/lib/hooks";
import { currentUser } from "@/lib/store";

export default function BliskiDashboard() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();

  useEffect(() => {
    if (!me) router.push("/");
    else if (me.role !== "bliski") router.push("/klient");
  }, [me, router]);

  if (!me || me.role !== "bliski") return null;

  const helper = db.helpers.find((h) => h.id === me.id);
  const now = Date.now();

  const visits = db.visits
    .filter((v) => v.helperId === me.id)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  const pending = visits.filter((v) => v.status === "pending");
  const upcoming = visits.filter(
    (v) => v.status === "confirmed" && new Date(v.startsAt).getTime() > now
  );

  const upcomingSlots = db.availability
    .filter((a) => a.helperId === me.id && new Date(a.startsAt).getTime() > now).length;

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold">Cześć, {me.fullName.split(" ")[0]} 🤝</h1>
      <p className="mt-2 text-brand-600">Panel Bliskiego.</p>

      {pending.length > 0 && (
        <div className="mt-6 rounded-2xl bg-warm-100 border border-warm-400/30 p-5">
          <div className="font-semibold text-warm-600">Masz {pending.length} {pending.length === 1 ? "prośbę" : "prośby"} o wizytę</div>
          <Link href="/bliski/wizyty" className="text-sm text-warm-600 underline">
            Zobacz i odpowiedz →
          </Link>
        </div>
      )}

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Card href="/bliski/profil" icon="👤" title="Mój profil" desc={helper?.bio ? "Uzupełniony" : "Uzupełnij profil"} />
        <Card href="/bliski/dostepnosc" icon="🗓️" title="Dostępność" desc={`${upcomingSlots} wolnych slotów`} />
        <Card href="/bliski/wizyty" icon="📅" title="Wizyty" desc={`${upcoming.length} nadchodzących`} />
      </div>

      {upcoming.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold">Nadchodzące wizyty</h2>
          <div className="mt-4 space-y-3">
            {upcoming.slice(0, 5).map((v) => {
              const senior = db.seniors.find((s) => s.id === v.seniorId);
              const client = db.users.find((u) => u.id === v.clientId);
              return (
                <Link
                  key={v.id}
                  href="/bliski/wizyty"
                  className="block bg-white rounded-2xl border border-brand-200 p-5 hover:border-warm-400"
                >
                  <div className="text-sm text-brand-500">{fmtDateTime(v.startsAt)}</div>
                  <div className="mt-1 font-semibold">{senior?.fullName ?? "-"}</div>
                  <div className="text-sm text-brand-600">klient: {client?.fullName ?? "-"}</div>
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
