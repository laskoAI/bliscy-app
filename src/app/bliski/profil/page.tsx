"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDB } from "@/lib/hooks";
import { currentUser, loadDB, saveDB } from "@/lib/store";

const AVAILABLE_SERVICES = [
  "Rozmowa", "Spacer", "Zakupy", "Wspólny posiłek",
  "Transport do lekarza", "Sprawy urzędowe", "Gry i pasje", "Pomoc z telefonem",
];

export default function ProfilPage() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();
  const helper = db.helpers.find((h) => h.id === me?.id);

  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [rate, setRate] = useState(40);
  const [transport, setTransport] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!me) router.push("/");
    else if (me.role !== "bliski") router.push("/klient");
  }, [me, router]);

  useEffect(() => {
    if (helper) {
      setBio(helper.bio);
      setCity(helper.city);
      setRate(helper.hourlyRate);
      setTransport(helper.transport);
      setServices(helper.services);
    }
  }, [helper]);

  if (!me || me.role !== "bliski" || !helper) return null;

  function toggle(s: string) {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    const d = loadDB();
    const h = d.helpers.find((x) => x.id === me!.id);
    if (h) {
      h.bio = bio;
      h.city = city;
      h.hourlyRate = Number(rate) || 0;
      h.transport = transport;
      h.services = services;
      saveDB(d);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-5 py-10">
      <Link href="/bliski" className="text-sm text-brand-500 hover:text-brand-800">← Panel</Link>
      <h1 className="mt-2 text-3xl font-bold">Mój profil</h1>
      <p className="mt-1 text-brand-600 text-sm">Tak zobaczą Cię klienci.</p>

      <form onSubmit={save} className="mt-6 bg-white rounded-2xl border border-brand-200 p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold">O mnie</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Kim jesteś, co Cię motywuje, co lubisz robić z ludźmi..."
            className="mt-2 w-full rounded-xl border border-brand-200 px-4 py-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Miasto</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-200 px-4 py-3"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Stawka (zł/h)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-brand-200 px-4 py-3"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Co oferujesz</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {AVAILABLE_SERVICES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggle(s)}
                className={`text-sm px-3 py-1.5 rounded-full border-2 ${services.includes(s) ? "border-warm-500 bg-warm-100/40" : "border-brand-200"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={transport} onChange={(e) => setTransport(e.target.checked)} />
          <span className="text-sm">Mam własne auto — mogę zawieźć</span>
        </label>

        <div className="flex items-center gap-3">
          <button className="rounded-xl bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3">
            Zapisz
          </button>
          {saved && <span className="text-sm text-emerald-700">✓ Zapisano</span>}
        </div>
      </form>
    </main>
  );
}
