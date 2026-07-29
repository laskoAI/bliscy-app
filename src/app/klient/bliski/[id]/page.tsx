"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDB, fmtDateTime } from "@/lib/hooks";
import { currentUser, loadDB, saveDB, uid } from "@/lib/store";
import { Avatar } from "@/components/Avatar";

export default function BliskiProfilPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedSenior = searchParams.get("senior") ?? "";
  const [seniorId, setSeniorId] = useState<string>(preselectedSenior);
  const [slotId, setSlotId] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (!me || me.role !== "klient") router.push("/");
  }, [me, router]);

  if (!me || me.role !== "klient") return null;

  const helper = db.helpers.find((h) => h.id === id);
  const user = db.users.find((u) => u.id === id);
  if (!helper || !user) {
    return (
      <main className="max-w-3xl mx-auto px-5 py-10">
        <p>Nie znaleziono Bliskiego.</p>
        <Link href="/klient/szukaj" className="text-warm-500">← wróć</Link>
      </main>
    );
  }

  const seniors = db.seniors.filter((s) => s.ownerId === me.id);
  const now = Date.now();
  const bookedSlotStartTimes = new Set(
    db.visits
      .filter((v) => v.helperId === helper.id && v.status !== "cancelled_by_client" && v.status !== "cancelled_by_helper")
      .map((v) => v.startsAt)
  );
  const slots = db.availability
    .filter((a) => a.helperId === helper.id)
    .filter((a) => new Date(a.startsAt).getTime() > now)
    .filter((a) => !bookedSlotStartTimes.has(a.startsAt))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  function book(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    if (!seniorId) { setMsg("Wybierz osobę, dla której rezerwujesz."); return; }
    if (!slotId) { setMsg("Wybierz termin."); return; }
    const slot = db.availability.find((a) => a.id === slotId);
    if (!slot) { setMsg("Termin niedostępny."); return; }

    const d = loadDB();
    d.visits.push({
      id: uid(),
      clientId: me!.id,
      seniorId,
      helperId: helper!.id,
      startsAt: slot.startsAt,
      endsAt: slot.endsAt,
      status: "pending",
      noteClient: note.trim() || undefined,
      createdAt: new Date().toISOString(),
    });
    saveDB(d);
    router.push("/klient/wizyty");
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <Link href="/klient/szukaj" className="text-sm text-brand-500 hover:text-brand-800">← Wyniki wyszukiwania</Link>

      <div className="mt-4 bg-white rounded-3xl border border-brand-200 p-6">
        <div className="flex items-center gap-4">
          <Avatar seed={user.fullName} size={64} alt={user.fullName} />
          <div>
            <h1 className="text-2xl font-bold">{user.fullName}</h1>
            <div className="text-brand-500">{helper.city} · {helper.hourlyRate} zł/h</div>
          </div>
        </div>
        <p className="mt-5 text-brand-800">{helper.bio}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {helper.services.map((s) => (
            <span key={s} className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">
              {s}
            </span>
          ))}
          {helper.transport && <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">🚗 własne auto</span>}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-3xl border border-brand-200 p-6">
        <h2 className="font-bold text-xl">Zarezerwuj wizytę</h2>

        {seniors.length === 0 && (
          <div className="mt-4 rounded-xl bg-warm-100 text-warm-600 p-4 text-sm">
            Najpierw dodaj osobę w <Link href="/klient/seniorzy" className="underline font-semibold">Moi seniorzy</Link>.
          </div>
        )}

        {slots.length === 0 && (
          <div className="mt-4 rounded-xl bg-brand-100 text-brand-700 p-4 text-sm">
            Brak wolnych terminów. Wróć później albo napisz do Bliskiego.
          </div>
        )}

        {seniors.length > 0 && slots.length > 0 && (
          <form onSubmit={book} className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-semibold">Dla kogo?</label>
              <select
                value={seniorId}
                onChange={(e) => setSeniorId(e.target.value)}
                className="mt-2 w-full rounded-xl border border-brand-200 bg-white px-4 py-3"
              >
                <option value="">-- wybierz osobę --</option>
                {seniors.map((s) => (
                  <option key={s.id} value={s.id}>{s.fullName} ({s.city})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Termin</label>
              <div className="mt-2 grid gap-2">
                {slots.map((s) => (
                  <label
                    key={s.id}
                    className={`flex items-center gap-3 rounded-xl border-2 p-3 cursor-pointer ${slotId === s.id ? "border-warm-500 bg-warm-100/40" : "border-brand-200"}`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={s.id}
                      checked={slotId === s.id}
                      onChange={() => setSlotId(s.id)}
                    />
                    <span className="text-sm">
                      {fmtDateTime(s.startsAt)} → {new Date(s.endsAt).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Notatka dla Bliskiego (opcjonalnie)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Np. spacer w parku, mama chodzi wolno..."
                className="mt-2 w-full rounded-xl border border-brand-200 bg-white px-4 py-3"
              />
            </div>

            {msg && <p className="text-sm text-red-600">{msg}</p>}

            <button className="rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3">
              Zarezerwuj wizytę
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
