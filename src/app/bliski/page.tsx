import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function BliskiDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (!profile?.role) redirect("/onboarding");
  if (profile.role !== "bliski") redirect("/klient");

  return (
    <main className="min-h-screen">
      <nav className="border-b border-brand-200 bg-white">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="wordmark text-2xl">bliscy</span>
          <form action="/auth/signout" method="post">
            <button className="text-sm text-brand-600 hover:text-brand-800">Wyloguj</button>
          </form>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold">Cześć{profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""} 🤝</h1>
        <p className="mt-2 text-brand-600">Panel Bliskiego. W następnej iteracji: profil publiczny, kalendarz dostępności, nadchodzące wizyty.</p>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white border border-brand-200 p-5">
            <div className="text-2xl">👤</div>
            <div className="mt-2 font-semibold">Mój profil</div>
            <div className="text-sm text-brand-600">Bio, miasto, stawka — to widzą klienci.</div>
            <Link href="#" className="mt-4 inline-block text-sm text-warm-500 font-semibold">Wkrótce →</Link>
          </div>
          <div className="rounded-2xl bg-white border border-brand-200 p-5">
            <div className="text-2xl">🗓️</div>
            <div className="mt-2 font-semibold">Dostępność</div>
            <div className="text-sm text-brand-600">Zaznacz kiedy możesz przyjmować wizyty.</div>
            <Link href="#" className="mt-4 inline-block text-sm text-warm-500 font-semibold">Wkrótce →</Link>
          </div>
          <div className="rounded-2xl bg-white border border-brand-200 p-5">
            <div className="text-2xl">📅</div>
            <div className="mt-2 font-semibold">Nadchodzące wizyty</div>
            <div className="text-sm text-brand-600">Kto, kiedy, gdzie.</div>
            <Link href="#" className="mt-4 inline-block text-sm text-warm-500 font-semibold">Wkrótce →</Link>
          </div>
        </div>

        <div className="mt-10 text-xs text-brand-500">DEBUG · rola: {profile.role} · miasto: {profile.city ?? "—"}</div>
      </div>
    </main>
  );
}
