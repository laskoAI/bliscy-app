// Prosty store w localStorage — bez backendu, na potrzeby MVP demo.
// Wszystko żyje w przeglądarce użytkownika.

export type Role = "klient" | "bliski";

export type User = {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  city: string;
  phone?: string;
};

export type Senior = {
  id: string;
  ownerId: string; // user.id klienta
  fullName: string;
  city: string;
  address?: string;
  phone?: string;
  birthYear?: number;
  notes?: string;
};

export type Helper = {
  id: string; // user.id
  bio: string;
  city: string;
  hourlyRate: number;
  services: string[]; // ["spacer","zakupy","transport",...]
  languages: string[];
  transport: boolean;
  verified: boolean;
};

export type Availability = {
  id: string;
  helperId: string;
  startsAt: string; // ISO
  endsAt: string;   // ISO
};

export type VisitStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled_by_client"
  | "cancelled_by_helper";

export type Visit = {
  id: string;
  clientId: string;
  seniorId: string;
  helperId: string;
  startsAt: string;
  endsAt: string;
  status: VisitStatus;
  noteClient?: string;
  noteHelper?: string;
  createdAt: string;
};

type DB = {
  currentUserId: string | null;
  users: User[];
  seniors: Senior[];
  helpers: Helper[];
  availability: Availability[];
  visits: Visit[];
};

const KEY = "bliscy-app-db-v1";

function empty(): DB {
  return { currentUserId: null, users: [], seniors: [], helpers: [], availability: [], visits: [] };
}

export function loadDB(): DB {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedDB();
    return JSON.parse(raw) as DB;
  } catch {
    return empty();
  }
}

export function saveDB(db: DB) {
  localStorage.setItem(KEY, JSON.stringify(db));
  window.dispatchEvent(new Event("bliscy-db-changed"));
}

export function resetDB() {
  localStorage.removeItem(KEY);
  seedDB();
  window.dispatchEvent(new Event("bliscy-db-changed"));
}

export function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// -----------------------------
// Seed — kilku Bliskich na start
// -----------------------------
function seedDB(): DB {
  const now = new Date();
  const in3h = (h: number) => {
    const d = new Date(now);
    d.setHours(now.getHours() + h, 0, 0, 0);
    return d.toISOString();
  };
  const inDays = (days: number, hour: number) => {
    const d = new Date(now);
    d.setDate(now.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString();
  };

  const helpers: User[] = [
    { id: "seed-h1", email: "ania@example.com",  role: "bliski", fullName: "Ania Nowak",       city: "Warszawa" },
    { id: "seed-h2", email: "kasia@example.com", role: "bliski", fullName: "Kasia Wiśniewska", city: "Warszawa" },
    { id: "seed-h4", email: "piotr@example.com", role: "bliski", fullName: "Piotr Zieliński",  city: "Warszawa" },
    { id: "seed-h5", email: "ewa@example.com",   role: "bliski", fullName: "Ewa Lewandowska",  city: "Warszawa" },
  ];

  const helperProfiles: Helper[] = [
    {
      id: "seed-h1",
      bio: "Studentka pielęgniarstwa. Uwielbiam rozmawiać z seniorami — moja babcia nauczyła mnie, że każda historia jest ważna.",
      city: "Warszawa",
      hourlyRate: 45,
      services: ["Spacer", "Rozmowa", "Zakupy", "Transport do lekarza"],
      languages: ["pl", "en"],
      transport: false,
      verified: true,
    },
    {
      id: "seed-h2",
      bio: "Emerytowana nauczycielka, mam czas i chęci. Lubię grać w karty, gotować i chodzić do parku.",
      city: "Warszawa",
      hourlyRate: 40,
      services: ["Rozmowa", "Wspólny posiłek", "Spacer", "Gry i pasje"],
      languages: ["pl"],
      transport: false,
      verified: true,
    },
    {
      id: "seed-h4",
      bio: "Emerytowany strażak, kocham psy. Wyprowadzam pieski od 20 lat — moje własne trzy, teraz też cudze.",
      city: "Warszawa",
      hourlyRate: 45,
      services: ["Wyprowadzanie psa", "Spacer", "Zakupy", "Drobne naprawy"],
      languages: ["pl"],
      transport: false,
      verified: true,
    },
    {
      id: "seed-h5",
      bio: "Farmaceutka po pracy. Chętnie pojadę do apteki, pomogę zorganizować leki, wytłumaczę dawkowanie.",
      city: "Warszawa",
      hourlyRate: 55,
      services: ["Apteka i leki", "Zakupy", "Sprawy urzędowe", "Rozmowa"],
      languages: ["pl", "en"],
      transport: true,
      verified: true,
    },
  ];

  const availability: Availability[] = [
    { id: uid(), helperId: "seed-h1", startsAt: inDays(1, 10), endsAt: inDays(1, 13) },
    { id: uid(), helperId: "seed-h1", startsAt: inDays(2, 15), endsAt: inDays(2, 18) },
    { id: uid(), helperId: "seed-h1", startsAt: inDays(4, 10), endsAt: inDays(4, 12) },
    { id: uid(), helperId: "seed-h2", startsAt: inDays(1, 14), endsAt: inDays(1, 17) },
    { id: uid(), helperId: "seed-h2", startsAt: inDays(3, 10), endsAt: inDays(3, 13) },
    { id: uid(), helperId: "seed-h4", startsAt: inDays(1, 8),  endsAt: inDays(1, 10) },
    { id: uid(), helperId: "seed-h4", startsAt: inDays(3, 16), endsAt: inDays(3, 18) },
    { id: uid(), helperId: "seed-h5", startsAt: inDays(2, 11), endsAt: inDays(2, 13) },
    { id: uid(), helperId: "seed-h5", startsAt: inDays(4, 15), endsAt: inDays(4, 17) },
  ];

  void in3h;

  const db: DB = {
    currentUserId: null,
    users: helpers,
    seniors: [],
    helpers: helperProfiles,
    availability,
    visits: [],
  };
  saveDB(db);
  return db;
}

// -----------------------------
// Helpers dostępowe
// -----------------------------
export function currentUser(db: DB): User | null {
  if (!db.currentUserId) return null;
  return db.users.find((u) => u.id === db.currentUserId) ?? null;
}

export function loginOrRegister(email: string, role: Role, fullName: string, city: string): User {
  const db = loadDB();
  let user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = { id: uid(), email: email.trim().toLowerCase(), role, fullName, city };
    db.users.push(user);
  } else {
    user.role = role;
    user.fullName = fullName || user.fullName;
    user.city = city || user.city;
  }
  db.currentUserId = user.id;

  // Bliski dostaje pusty profil helper jeśli nie ma
  if (role === "bliski" && !db.helpers.find((h) => h.id === user!.id)) {
    db.helpers.push({
      id: user.id,
      bio: "",
      city: city,
      hourlyRate: 40,
      services: [],
      languages: ["pl"],
      transport: false,
      verified: true, // dla dema od razu widoczny
    });
  }

  saveDB(db);
  return user;
}

export function logout() {
  const db = loadDB();
  db.currentUserId = null;
  saveDB(db);
}
