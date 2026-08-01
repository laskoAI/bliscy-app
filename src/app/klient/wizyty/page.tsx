"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDB, fmtDateTime } from "@/lib/hooks";
import { currentUser, loadDB, saveDB } from "@/lib/store";

export default function WizytyPage() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();

  useEffect(() => {
    if (!me || me.role !== "klient") router.push("/");
  }, [me, router]);

  if (!me || me.role !== "klient") return null;

  const visits = db.visits
    .filter((v) => v.clientId === me.id)
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));

  function cancel(id: string) {
    if (!confirm("Anulować wizytę?")) return;
    const d = loadDB();
    const v = d.visits.find((x) => x.id === id);
    if (v) { v.status = "cancelled_by_client"; saveDB(d); }
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <Link href="/klient" className="text-sm text-brand-500 hover:text-brand-800">← Panel</Link>
      <h1 className="mt-2 text-3xl font-bold">Wizyty</h1>

      <div className="mt-6 space-y-3">
        {visits.length === 0 && (
          <div className="rounded-2xl border border-dashed border-brand-300 p-8 text-center text-brand-500">
            Nie masz jeszcze żadnych wizyt.{" "}
            <Link href="/klient/szukaj" className="text-warm-500 underline">Znajdź Bliskiego</Link>.
          </div>
        )}
        {visits.map((v) => {
          const senior = db.seniors.find((s) => s.id === v.seniorId);
          const helperUser = db.users.find((u) => u.id === v.helperId);
          const active = v.status === "pending" || v.status === "confirmed";
          return (
            <div key={v.id} className="bg-white rounded-2xl border border-brand-200 p-5">
              <div className="flex justify-between gap-3">
                <div>
                  <div className="text-sm text-brand-500">{fmtDateTime(v.startsAt)}</div>
                  <div className="mt-1 font-semibold">{senior?.fullName ?? "-"} z {helperUser?.fullName ?? "-"}</div>
                  {v.noteClient && <div className="mt-2 text-sm text-brand-700">📝 {v.noteClient}</div>}
                  {v.noteHelper && <div className="mt-1 text-sm text-leaf-500">💬 {helperUser?.fullName?.split(" ")[0]}: {v.noteHelper}</div>}
                </div>
                <StatusBadge status={v.status} />
              </div>
              {active && (
                <button onClick={() => cancel(v.id)} className="mt-3 text-sm text-red-600 hover:text-red-800">
                  Anuluj
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
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
  return <span className={`text-xs px-2 py-1 rounded-full font-semibold h-fit ${m.cls}`}>{m.label}</span>;
}
