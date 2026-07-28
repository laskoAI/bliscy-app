# bliscy — aplikacja (demo lokalne)

Prototyp aplikacji łączącej klientów (rodziny) z **Bliskimi** (osoby oferujące towarzystwo seniorom).
Wersja **bez backendu** — cały stan trzymany w `localStorage` przeglądarki. Do puszczenia lokalnie
w kilka sekund, do testowania flow bez ustawiania Supabase / auth / bazy.

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz http://localhost:3000

## Co można kliknąć

### Ścieżka klienta
1. Na stronie startowej wybierz **Klient**, wpisz imię + email + miasto → wejdź do panelu
2. **Moi seniorzy** → dodaj bliską osobę (rodzic/dziadek)
3. **Znajdź Bliskiego** → wybierz spośród 3 seedowanych (Warszawa/Kraków)
4. Wejdź w profil → wybierz seniora + termin → **Zarezerwuj wizytę**
5. **Wizyty** → widzisz status, możesz anulować

### Ścieżka Bliskiego
1. Otwórz aplikację w **innej przeglądarce / trybie incognito** (lokalstorage jest oddzielny)
2. Wybierz **Bliski**, wpisz dane → wejdź do panelu
3. **Mój profil** → uzupełnij bio, stawkę, usługi
4. **Dostępność** → dodaj sloty czasowe
5. **Wizyty** → akceptuj/odrzuć prośby, dodawaj notatki po wizycie

## Struktura

```
src/
├── app/
│   ├── page.tsx              # start — logowanie/rejestracja
│   ├── klient/
│   │   ├── page.tsx          # dashboard
│   │   ├── seniorzy/         # zarządzanie seniorami
│   │   ├── szukaj/           # wyszukiwarka Bliskich
│   │   ├── bliski/[id]/      # profil + rezerwacja
│   │   └── wizyty/           # lista wizyt
│   └── bliski/
│       ├── page.tsx          # dashboard
│       ├── profil/           # edycja profilu
│       ├── dostepnosc/       # sloty
│       └── wizyty/           # zarządzanie wizytami
├── lib/
│   ├── store.ts              # cały store + seed danych
│   └── hooks.ts              # useDB, formatowanie dat
└── components/
    └── Nav.tsx               # górna nawigacja
```

## Model danych (w localStorage)

- **users** — konta (klient / bliski)
- **seniors** — osoby dodane przez klienta
- **helpers** — profile publiczne Bliskich (bio, usługi, stawka)
- **availability** — sloty dostępności Bliskiego
- **visits** — rezerwacje z pełnym cyklem statusów: `pending` → `confirmed` → `completed`, plus anulowania

## Reset danych

W górnej nawigacji jest przycisk **Reset demo** — czyści localStorage i przywraca seedowanych Bliskich.

## Ograniczenia demo

- Dane żyją tylko w jednej przeglądarce. Klient i Bliski to praktycznie dwie osobne "instalacje".
- Aby zobaczyć jak Bliski reaguje na rezerwację klienta, użyj tego samego browsera — obie strony widzą ten sam localStorage. (Tak, można się przelogować i zobaczyć obie perspektywy w jednej sesji.)
- Brak walidacji konfliktów slotów, brak stref czasowych, brak powiadomień mailowych.
- Brak auth — kliknięcie "Wyloguj" tylko czyści aktywnego użytkownika, dane zostają.

## Roadmap

- [x] Wybór roli, dashboard klienta i Bliskiego
- [x] Seniorzy klienta
- [x] Wyszukiwarka + profil + rezerwacja
- [x] Dostępność (sloty) + zarządzanie wizytami
- [ ] Podpięcie prawdziwej bazy (Supabase) + auth (magic link)
- [ ] Powiadomienia mailowe (Resend)
- [ ] Płatności (Stripe)
- [ ] Weryfikacja Bliskich, oceny, historia
