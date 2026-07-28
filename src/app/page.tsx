import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // sprawdź role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    if (!profile?.role) redirect("/onboarding");
    if (profile.role === "klient") redirect("/klient");
    if (profile.role === "bliski") redirect("/bliski");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-lg text-center">
        <h1 className="wordmark text-5xl md:text-6xl text-brand-800">bliscy</h1>
        <p className="mt-4 text-brand-600">Panel aplikacji — logowanie, rezerwacje wizyt, kalendarz Bliskich.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="rounded-full bg-warm-500 hover:bg-warm-600 text-white font-semibold px-6 py-3">
            Zaloguj się
          </Link>
          <Link href="/login" className="rounded-full border border-brand-300 hover:bg-brand-100 text-brand-800 font-semibold px-6 py-3">
            Zarejestruj się
          </Link>
        </div>
        <p className="mt-8 text-xs text-brand-500">
          Landing publiczny: <a href="https://bliscy.vercel.app" className="underline">bliscy.vercel.app</a>
        </p>
      </div>
    </main>
  );
}
