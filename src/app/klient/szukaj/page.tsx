"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDB } from "@/lib/hooks";
import { currentUser } from "@/lib/store";
import { Avatar } from "@/components/Avatar";

export default function SzukajPage() {
  const db = useDB();
  const me = currentUser(db);
  const router = useRouter();
  const [city, setCity] = useState("");
  const [service, setService] = useState("");

  useEffect(() => {
    if (!me || me.role !== "klient") router.push("/");
    else if (me && !city) setCity(me.city);
  }, [me, router, city]);

  const results = useMemo(() => {
    return db.helpers
      .filter((h) => h.verified)
      .filter((h) => (city ? h.city.toLowerCase().includes(city.toLowerCase()) : true))
      .filter((h) => (service ? h.services.some((s) => s.toLowerCase().includes(service.toLowerCase())) : true))
      .map((h) => ({ helper: h, user: db.users.find((u) => u.id === h.id)! }))
      .filter((x) => x.user);
  }, [db, city, service]);

  if (!me || me.role !== "klient") return null;

  const services = Array.from(new Set(db.helpers.flatMap((h) => h.services)));

  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <Link href="/klient" className="text-sm text-brand-500 hover:text-brand-800">← Panel</Link>
      <h1 className="mt-2 text-3xl font-bold">Znajdź Bliskiego</h1>
      <p className="mt-1 text-brand-600 text-sm">Przeglądaj zweryfikowanych Bliskich w Twojej okolicy.</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Miasto"
          className="rounded-xl border border-brand-200 bg-white px-4 py-3"
        />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="rounded-xl border border-brand-200 bg-white px-4 py-3"
        >
          <option value="">Wszystkie usługi</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {results.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-brand-300 p-8 text-center text-brand-500">
            Brak wyników w podanym mieście / usłudze.
          </div>
        )}
        {results.map(({ helper, user }) => (
          <Link
            key={helper.id}
            href={`/klient/bliski/${helper.id}`}
            className="bg-white rounded-2xl border border-brand-200 p-5 hover:border-warm-400 transition"
          >
            <div className="flex items-center gap-3">
              <Avatar seed={user.fullName} size={48} alt={user.fullName} />
              <div>
                <div className="font-semibold">{user.fullName}</div>
                <div className="text-sm text-brand-500">{helper.city} · {helper.hourlyRate} zł/h</div>
              </div>
              {helper.transport && (
                <span className="ml-auto text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">🚗 auto</span>
              )}
            </div>
            <p className="mt-3 text-sm text-brand-700 line-clamp-2">{helper.bio || "Brak opisu."}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {helper.services.slice(0, 4).map((s) => (
                <span key={s} className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
