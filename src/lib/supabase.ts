// Konfiguracja Supabase (klient publiczny - anon key)
// Używamy tego samego projektu co landing (waitlist).
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ofrgucsumxydrkwvtrik.supabase.co";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcmd1Y3N1bXh5ZHJrd3Z0cmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMjc5ODIsImV4cCI6MjEwMDgwMzk4Mn0.oYTNg76pz4gO7xQ-tNTcTGLvvqlIUzRgQs05s7rEXN8";

export type PhoneLead = {
  phone: string;
  relation?: string;
  age_range?: string;
  needs?: string[];
  other_need?: string;
  city?: string;
  source?: string;
};

export async function submitPhoneLead(payload: PhoneLead): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/phone_leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const text = await res.text().catch(() => "");
    console.error("Supabase phone_leads error:", res.status, text);
    return { ok: false, error: `Status ${res.status}` };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Brak połączenia" };
  }
}
