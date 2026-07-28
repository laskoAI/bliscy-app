"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDB, fmtDateTime } from "@/lib/hooks";
import { currentUser, loadDB, saveDB, uid } from "@/lib/store";

function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function DostepnoscPage() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();

  const now = new Date();
  const defaultStart = new Date(now);
  defaultStart.setDate(now.getDate() + 1);
  defaultStart.setHours(10, 0, 0, 0);
  const defaultEnd = new Date(defaultStart);
  defaultEnd.setHours(defaultStart.getHours() + 2);

  const [startsAt, setStartsAt] = useState(toLocalInputValue(defaultStart));
  const [endsAt, setEndsAt] = useState(toLocalInputValue(defaultEnd));
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!me) router.push("/");
    else if (me.role !== "bliski") router.push("/klient");
  }, [me, router]);

  if (!me || me.role !== "bliski") return null;

  const slots = db.availability
    .filter((a) => a.helperId === me.id)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  const bookedSlotStartTimes = new Set(
    db.visits
      .filter((v) => v.helperId === me.id && v.status !== "cancelled_by_client" && v.status !== "cancelled_by_helper")
      .map((v) => v.startsAt)
  );

  function addSlot(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const s = new Date(startsAt);
    const e2 = new Date(endsAt);
    if (isNaN(s.getTime()) || isNaN(e2.getTime())) { setMsg("Niepoprawna data."); return; }
    if (e2 <= s) { setMsg("Koniec musi być po początku."); return; }
    if (s.getTime() < Date.now()) { setMsg("Slot musi być w przyszłości."); return; }

    const d = loadDB();
    d.availability.push({
      id: uid(),
      helperId: me!.id,
      startsAt: s.toISOString(),
      endsAt: e2.toISOString(),
    });
    saveDB(d);
  }

  function removeSlot(id: string) {
    if (!confirm("Usunąć ten slot? Wizyt już umówionych to nie ruszy.")) return;
    const d = loadDB();
    d.availability = d.availability.filter((a) => a.id !== id);
    saveDB(d);
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <Link href="/bliski" className="text-sm text-brand-500 hover:text-brand-800">← Panel</Link>
      <h1 className="mt-2 text-3xl font-bold">Dostępność</h1>
      <p className="mt-1 text-brand-600 text-sm">Dodaj sloty, w których możesz przyjmować wizyty.</p>

      <form onSubmit={addSlot} className="mt-6 bg-white rounded-2xl border border-brand-200 p-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Od</label>
            <input
              type="datetime-local"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Do</label>
            <input
              type="datetime-local"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
              className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2"
            />
          </div>
        </div>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <button className="rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-4 py-2">
          + Dodaj slot
        </button>
      </form>

      <div className="mt-8 space-y-2">
        {slots.length === 0 && (
          <div className="rounded-2xl border border-dashed border-brand-300 p-8 text-center text-brand-500">
            Brak slotów.
          </div>
        )}
        {slots.map((s) => {
          const past = new Date(s.startsAt).getTime() < Date.now();
          const booked = bookedSlotStartTimes.has(s.startsAt);
          return (
            <div key={s.id} className={`bg-white rounded-xl border p-4 flex justify-between items-center ${past ? "opacity-60" : ""} border-brand-200`}>
              <div>
                <div className="font-semibold">{fmtDateTime(s.startsAt)}</div>
                <div className="text-sm text-brand-500">
                  do {new Date(s.endsAt).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                  {booked && <span className="ml-2 text-emerald-700">· zajęte</span>}
                  {past && !booked && <span className="ml-2 text-brand-400">· minione</span>}
                </div>
              </div>
              {!booked && (
                <button onClick={() => removeSlot(s.id)} className="text-sm text-red-600 hover:text-red-800">
                  Usuń
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
