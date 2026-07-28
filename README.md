# bliscy — aplikacja (test / staging)

Next.js 16 + Supabase (Auth + Postgres + RLS). Iteracja 1: setup + auth (magic link) + schema DB + onboarding.

## Uruchomienie lokalne

```bash
npm install
cp .env.example .env.local
# uzupełnij NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

Otwórz http://localhost:3000

## Konfiguracja Supabase

1. Utwórz nowy projekt na https://supabase.com (osobny od landing/waitlist).
2. Wykonaj `supabase/schema.sql` w SQL Editor.
3. Auth → URL Configuration → dodaj do "Redirect URLs":
   - `http://localhost:3000/auth/callback`
   - `https://<twoj-projekt>.vercel.app/auth/callback` (po deployu)
4. Skopiuj z Project Settings → API:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Struktura

```
src/
├── app/
│   ├── page.tsx              # landing panelu (przekierowuje na dashboard po logowaniu)
│   ├── login/                # magic link
│   ├── auth/
│   │   ├── callback/         # exchange code for session
│   │   └── signout/          # POST wylogowania
│   ├── onboarding/           # wybór roli + dane podstawowe
│   ├── klient/               # dashboard klienta
│   └── bliski/               # dashboard Bliskiego
├── lib/
│   ├── supabase-browser.ts   # client dla client components
│   └── supabase-server.ts    # client dla server components
└── middleware.ts             # ochrona ścieżek + odświeżanie sesji
supabase/
└── schema.sql                # tabele + RLS
```

## Model danych

- **profiles** — rozszerzenie `auth.users`, przechowuje rolę (`klient` / `bliski` / `admin`)
- **seniors** — osoby, którymi opiekuje się klient
- **helpers** — publiczny profil Bliskiego (bio, miasto, stawka, weryfikacja)
- **availability** — sloty czasowe Bliskiego
- **visits** — rezerwacje z pełnym cyklem statusów

Wszystko chronione przez RLS. Klient widzi swoje, Bliski swoje, publicznie widoczni są tylko zweryfikowani Blisci.

## Roadmap

- [x] **Iteracja 1** — auth, onboarding, schema DB, dashboardy (szkielet)
- [ ] **Iteracja 2** — profil Bliskiego, dostępność (kalendarz), publiczna lista
- [ ] **Iteracja 3** — seniorzy klienta, wyszukiwarka Bliskich, rezerwacja wizyt
- [ ] **Iteracja 4** — powiadomienia mailowe (Supabase Edge Function + Resend), statusy wizyt, oceny
- [ ] **Później** — płatności (Stripe), moderacja, admin panel
