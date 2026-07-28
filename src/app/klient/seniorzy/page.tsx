"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDB } from "@/lib/hooks";
import { currentUser, loadDB, saveDB, uid } from "@/lib/store";

export default function SeniorzyPage() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();

  useEffect(() => {
    if (!me || me.role !== "klient") router.push("/");
  }, [me, router]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fullName: "", city: "", address: "", phone: "", birthYear: "", notes: "" });

  if (!me || me.role !== "klient") return null;

  const seniors = db.seniors.filter((s) => s.ownerId === me.id);

  function addSenior(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim()) return;
    const d = loadDB();
    d.seniors.push({
      id: uid(),
      ownerId: me!.id,
      fullName: form.fullName.trim(),
      city: form.city.trim() || me!.city,
      address: form.address.trim() || undefined,
      phone: form.phone.trim() || undefined,
      birthYear: form.birthYear ? Number(form.birthYear) : undefined,
      notes: form.notes.trim() || undefined,
    });
    saveDB(d);
    setForm({ fullName: "", city: "", address: "", phone: "", birthYear: "", notes: "" });
    setShowForm(false);
  }

  function removeSenior(id: string) {
    if (!confirm("Usunąć tę osobę?")) return;
    const d = loadDB();
    d.seniors = d.seniors.filter((s) => s.id !== id);
    saveDB(d);
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/klient" className="text-sm text-brand-500 hover:text-brand-800">← Panel</Link>
          <h1 className="mt-2 text-3xl font-bold">Moi seniorzy</h1>
          <p className="mt-1 text-brand-600 text-sm">Osoby, którymi się opiekujesz.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-4 py-2 text-sm"
        >
          {showForm ? "Zamknij" : "+ Dodaj osobę"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addSenior} className="mt-6 bg-white rounded-2xl border border-brand-200 p-5 space-y-3">
          <input
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Imię i nazwisko *"
            className="w-full rounded-xl border border-brand-200 px-4 py-2"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Miasto"
              className="rounded-xl border border-brand-200 px-4 py-2"
            />
            <input
              value={form.birthYear}
              onChange={(e) => setForm({ ...form, birthYear: e.target.value })}
              placeholder="Rok urodzenia"
              type="number"
              className="rounded-xl border border-brand-200 px-4 py-2"
            />
          </div>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Adres (opcjonalnie)"
            className="w-full rounded-xl border border-brand-200 px-4 py-2"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Telefon (opcjonalnie)"
            className="w-full rounded-xl border border-brand-200 px-4 py-2"
          />
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Notatki: pasje, ograniczenia, co lubi..."
            rows={3}
            className="w-full rounded-xl border border-brand-200 px-4 py-2"
          />
          <button className="rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-4 py-2">
            Zapisz
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {seniors.length === 0 && (
          <div className="rounded-2xl border border-dashed border-brand-300 p-8 text-center text-brand-500">
            Jeszcze nikogo nie dodałeś. Zacznij od kliknięcia „+ Dodaj osobę".
          </div>
        )}
        {seniors.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-brand-200 p-5 flex justify-between gap-4">
            <div>
              <div className="font-semibold">{s.fullName}</div>
              <div className="text-sm text-brand-600">
                {s.city}
                {s.birthYear ? ` · rocznik ${s.birthYear}` : ""}
              </div>
              {s.notes && <div className="mt-2 text-sm text-brand-700">{s.notes}</div>}
            </div>
            <button onClick={() => removeSenior(s.id)} className="text-sm text-red-600 hover:text-red-800">
              Usuń
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
