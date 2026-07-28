"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setErr("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setState("error");
      setErr(error.message);
    } else {
      setState("sent");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <a href="/" className="wordmark text-3xl text-brand-800">bliscy</a>
        <h1 className="mt-6 text-2xl font-bold">Zaloguj się</h1>
        <p className="mt-2 text-brand-600 text-sm">
          Wyślemy Ci link do logowania na e-mail. Bez hasła.
        </p>

        {state === "sent" ? (
          <div className="mt-8 rounded-2xl bg-white border border-brand-200 p-6">
            <p className="font-semibold">Sprawdź skrzynkę 📬</p>
            <p className="mt-2 text-sm text-brand-600">
              Wysłaliśmy link logowania na <strong>{email}</strong>. Kliknij, żeby wejść do panelu.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 focus:outline-none focus:ring-4 focus:ring-warm-100 focus:border-warm-400"
            />
            <button
              disabled={state === "sending"}
              className="w-full rounded-xl bg-warm-500 hover:bg-warm-600 disabled:opacity-50 text-white font-semibold px-6 py-3"
            >
              {state === "sending" ? "Wysyłam..." : "Wyślij link logowania"}
            </button>
            {err && <p className="text-sm text-red-600">{err}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
