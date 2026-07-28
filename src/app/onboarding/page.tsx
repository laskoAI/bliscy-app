"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function OnboardingPage() {
  const router = useRouter();
  const [role, setRole] = useState<"klient" | "bliski" | "">("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role) { setErr("Wybierz, kim jesteś."); return; }
    setSaving(true);
    setErr("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName.trim() || null,
      city: city.trim() || null,
      role,
    });

    if (error) {
      setErr(error.message);
      setSaving(false);
      return;
    }

    router.push(role === "klient" ? "/klient" : "/bliski");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-lg">
        <a href="/" className="wordmark text-3xl text-brand-800">bliscy</a>
        <h1 className="mt-6 text-3xl font-bold">Witamy w bliscy 👋</h1>
        <p className="mt-2 text-brand-600">Powiedz nam, kim jesteś. Zajmie to chwilę.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-semibold">Kim jesteś?</label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("klient")}
                className={`rounded-2xl border-2 p-4 text-left ${role === "klient" ? "border-warm-500 bg-warm-100/40" : "border-brand-200 bg-white"}`}
              >
                <div className="text-2xl">👨‍👩‍👧</div>
                <div className="mt-2 font-semibold">Szukam wsparcia</div>
                <div className="text-xs text-brand-600">dla siebie lub bliskiej osoby</div>
              </button>
              <button
                type="button"
                onClick={() => setRole("bliski")}
                className={`rounded-2xl border-2 p-4 text-left ${role === "bliski" ? "border-warm-500 bg-warm-100/40" : "border-brand-200 bg-white"}`}
              >
                <div className="text-2xl">🤝</div>
                <div className="mt-2 font-semibold">Chcę być Bliskim</div>
                <div className="text-xs text-brand-600">pomagam seniorom w mojej okolicy</div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Imię i nazwisko</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Anna Kowalska"
              className="mt-2 w-full rounded-xl border border-brand-200 bg-white px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Miasto</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Warszawa"
              className="mt-2 w-full rounded-xl border border-brand-200 bg-white px-4 py-3"
            />
          </div>

          <button
            disabled={saving}
            className="w-full rounded-xl bg-warm-500 hover:bg-warm-600 disabled:opacity-50 text-white font-semibold px-6 py-3"
          >
            {saving ? "Zapisuję..." : "Dalej"}
          </button>
          {err && <p className="text-sm text-red-600">{err}</p>}
        </form>
      </div>
    </main>
  );
}
