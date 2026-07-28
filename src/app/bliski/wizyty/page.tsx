"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDB, fmtDateTime } from "@/lib/hooks";
import { currentUser, loadDB, saveDB } from "@/lib/store";

export default function BliskiWizyty() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();
  const [openNote, setOpenNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (!me || me.role !== "bliski") router.push("/");
  }, [me, router]);

  if (!me || me.role !== "bliski") return null;

  const visits = db.visits
    .filter((v) => v.helperId === me.id)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  const pending = visits.filter((v) => v.status === "pending");
  const upcoming = visits.filter((v) => v.status === "confirmed" && new Date(v.startsAt).getTime() > Date.now());
  const past = visits.filter((v) => v.status === "completed" || new Date(v.endsAt).getTime() < Date.now() && v.status === "confirmed");
  const other = visits.filter((v) => !pending.includes(v) && !upcoming.includes(v) && !past.includes(v));

  function setStatus(id: string, status: "confirmed" | "cancelled_by_helper" | "completed") {
    const d = loadDB();
    const v = d.visits.find((x) => x.id === id);
    if (v) { v.status = status; saveDB(d); }
  }

  function saveNote(id: string) {
    const d = loadDB();
    const v = d.visits.find((x) => x.id === id);
    if (v) { v.noteHelper = noteText.trim() || undefined; saveDB(d); }
    setOpenNote(null);
    setNoteText("");
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <Link href="/bliski" className="text-sm text-brand-500 hover:text-brand-800">← Panel</Link>
      <h1 className="mt-2 text-3xl font-bold">Wizyty</h1>

      <Section title={`Prośby (${pending.length})`} accent>
        {pending.length === 0 && <Empty>Brak nowych próśb.</Empty>}
        {pending.map((v) => <VisitCard key={v.id} v={v} db={db} actions={
          <div className="flex gap-2">
            <button onClick={() => setStatus(v.id, "confirmed")} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2">Akceptuję</button>
            <button onClick={() => setStatus(v.id, "cancelled_by_helper")} className="rounded-xl border border-red-300 text-red-700 hover:bg-red-50 text-sm font-semibold px-4 py-2">Odrzuć</button>
          </div>
        }/>)}
      </Section>

      <Section title={`Nadchodzące (${upcoming.length})`}>
        {upcoming.length === 0 && <Empty>Brak potwierdzonych wizyt.</Empty>}
        {upcoming.map((v) => (
          <VisitCard key={v.id} v={v} db={db} actions={
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setStatus(v.id, "completed")} className="rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-4 py-2">Oznacz jako zakończoną</button>
              <button onClick={() => { setOpenNote(v.id); setNoteText(v.noteHelper ?? ""); }} className="rounded-xl border border-brand-300 text-brand-800 text-sm font-semibold px-4 py-2">Notatka</button>
            </div>
          } noteEditor={openNote === v.id ? (
            <div className="mt-3 space-y-2">
              <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={3} placeholder="Krótki raport z wizyty..." className="w-full rounded-xl border border-brand-200 px-3 py-2"/>
              <div className="flex gap-2">
                <button onClick={() => saveNote(v.id)} className="rounded-xl bg-warm-500 text-white text-sm font-semibold px-3 py-1.5">Zapisz</button>
                <button onClick={() => setOpenNote(null)} className="text-sm text-brand-500">Anuluj</button>
              </div>
            </div>
          ) : null}/>
        ))}
      </Section>

      {past.length > 0 && (
        <Section title={`Zakończone (${past.length})`} muted>
          {past.map((v) => <VisitCard key={v.id} v={v} db={db} />)}
        </Section>
      )}

      {other.length > 0 && (
        <Section title={`Pozostałe (${other.length})`} muted>
          {other.map((v) => <VisitCard key={v.id} v={v} db={db} />)}
        </Section>
      )}
    </main>
  );
}

function Section({ title, children, accent, muted }: { title: string; children: React.ReactNode; accent?: boolean; muted?: boolean }) {
  return (
    <section className={`mt-8 ${muted ? "opacity-80" : ""}`}>
      <h2 className={`text-xl font-bold ${accent ? "text-warm-600" : ""}`}>{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-brand-300 p-6 text-center text-brand-500">{children}</div>;
}

function VisitCard({ v, db, actions, noteEditor }: {
  v: import("@/lib/store").Visit;
  db: ReturnType<typeof loadDB>;
  actions?: React.ReactNode;
  noteEditor?: React.ReactNode;
}) {
  const client = db.users.find((u) => u.id === v.clientId);
  const senior = db.seniors.find((s) => s.id === v.seniorId);
  return (
    <div className="bg-white rounded-2xl border border-brand-200 p-5">
      <div className="flex justify-between gap-3">
        <div>
          <div className="text-sm text-brand-500">{fmtDateTime(v.startsAt)}</div>
          <div className="mt-1 font-semibold">{senior?.fullName ?? "—"}</div>
          <div className="text-sm text-brand-600">
            klient: {client?.fullName ?? "—"}
            {senior?.address && <> · {senior.address}</>}
          </div>
          {v.noteClient && <div className="mt-2 text-sm text-brand-700">📝 {v.noteClient}</div>}
          {v.noteHelper && <div className="mt-1 text-sm text-leaf-500">💬 Twoja notatka: {v.noteHelper}</div>}
        </div>
        <StatusBadge status={v.status} />
      </div>
      {actions && <div className="mt-4">{actions}</div>}
      {noteEditor}
    </div>
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
